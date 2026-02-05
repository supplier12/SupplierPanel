import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Search, Package, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  category: string;
  name: string;
  mrp: number;
  sellingPrice: number;
}

export const ProductSection = () => {
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([
    { id: "1", category: "Sound Crackers", name: "Thunder King 1000 Wala", mrp: 300, sellingPrice: 250 },
    { id: "2", category: "Sparklers", name: "Golden Sparklers Pack", mrp: 150, sellingPrice: 120 },
    { id: "3", category: "Rockets", name: "Rocket Bombs Deluxe", mrp: 220, sellingPrice: 180 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = ["Sound Crackers", "Sparklers", "Rockets"];

  const productsByCategory: Record<string, string[]> = {
    "Sound Crackers": ["Thunder King 1000 Wala"],
    Sparklers: ["Golden Sparklers Pack"],
    Rockets: ["Rocket Bombs Deluxe"],
  };

  const [form, setForm] = useState({
    category: "",
    productName: "",
    mrp: "",
    sellingPrice: "",
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = () => {
    const product = products.find(
      (p) => p.category === form.category && p.name === form.productName
    );
    if (!product) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              mrp: Number(form.mrp),
              sellingPrice: Number(form.sellingPrice),
            }
          : p
      )
    );

    toast({
      title: "Updated",
      description: "MRP & Selling Price updated successfully",
    });

    setForm({ category: "", productName: "", mrp: "", sellingPrice: "" });
  };

  return (
    <div className="space-y-6">

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" /> Product Inventory
          </CardTitle>
          <CardDescription>Supplier manages MRP & Selling Price</CardDescription>
        </CardHeader>

        <CardContent>
          <Input
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>MRP (₹)</TableHead>
                <TableHead>Selling Price (₹)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Badge variant="outline">{p.category}</Badge>
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>₹{p.mrp}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ₹{p.sellingPrice}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingProduct(p)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* UPDATE SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Update Product Pricing</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-5 gap-4">
          <Select
            value={form.category}
            onValueChange={(v) =>
              setForm({ ...form, category: v, productName: "" })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={form.productName}
            onValueChange={(v) => setForm({ ...form, productName: v })}
            disabled={!form.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent>
              {form.category &&
                productsByCategory[form.category].map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="MRP"
            value={form.mrp}
            onChange={(e) => setForm({ ...form, mrp: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Selling Price"
            value={form.sellingPrice}
            onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
          />

          <Button onClick={handleUpdate}>
            <Save className="h-4 w-4 mr-2" /> Update
          </Button>
        </CardContent>
      </Card>

      {/* EDIT DIALOG */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product Pricing</DialogTitle>
            <DialogDescription>{editingProduct?.name}</DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-3">
              <Input value={editingProduct.category} disabled />
              <Input value={editingProduct.name} disabled />

              <Input
                type="number"
                value={editingProduct.mrp}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    mrp: Number(e.target.value),
                  })
                }
                placeholder="MRP"
              />

              <Input
                type="number"
                value={editingProduct.sellingPrice}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    sellingPrice: Number(e.target.value),
                  })
                }
                placeholder="Selling Price"
              />

              <Button
                onClick={() => {
                  setProducts((prev) =>
                    prev.map((p) =>
                      p.id === editingProduct.id ? editingProduct : p
                    )
                  );
                  setEditingProduct(null);
                }}
              >
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};


