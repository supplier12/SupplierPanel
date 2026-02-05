import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Search, Package, RotateCcw, Save, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  category: string;
  name: string;
  mrp: number;
  sellingPrice: number;
}

export const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", category: "Sound Crackers", name: "Thunder King 1000 Wala", mrp: 300, sellingPrice: 250 },
    { id: "2", category: "Sparklers", name: "Golden Sparklers Pack", mrp: 150, sellingPrice: 120 },
    { id: "3", category: "Rockets", name: "Rocket Bombs Deluxe", mrp: 220, sellingPrice: 180 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [updateForm, setUpdateForm] = useState({
    category: "",
    name: "",
    mrp: "",
    sellingPrice: ""
  });

  const categories = ["Sound Crackers", "Sparklers", "Rockets"];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdatePrice = async () => {
    const product = products.find(
      p => p.category === updateForm.category && p.name === updateForm.name
    );

    if (!product) return;

    setSaving(true);

    setProducts(products.map(p =>
      p.id === product.id
        ? {
            ...p,
            mrp: Number(updateForm.mrp),
            sellingPrice: Number(updateForm.sellingPrice)
          }
        : p
    ));

    setTimeout(() => {
      setSaving(false);
      setUpdateForm({ category: "", name: "", mrp: "", sellingPrice: "" });
      toast({ title: "Updated", description: "MRP & Selling Price updated successfully" });
    }, 500);
  };

  return (
    <div className="space-y-6">

      {/* Product Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" /> Product Inventory
          </CardTitle>
          <CardDescription>Manage MRP and Selling Price</CardDescription>
        </CardHeader>

        <CardContent>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>MRP (₹)</TableHead>
                <TableHead>Selling Price (₹)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>₹{product.mrp}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    ₹{product.sellingPrice}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => setEditingProduct(product)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Update Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" /> Update Product Pricing
          </CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-5 gap-4">
          <Select onValueChange={(v) => setUpdateForm({ ...updateForm, category: v, name: "" })}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>

          <Input placeholder="Product Name" value={updateForm.name}
            onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })} />

          <Input placeholder="MRP" type="number"
            value={updateForm.mrp}
            onChange={(e) => setUpdateForm({ ...updateForm, mrp: e.target.value })} />

          <Input placeholder="Selling Price" type="number"
            value={updateForm.sellingPrice}
            onChange={(e) => setUpdateForm({ ...updateForm, sellingPrice: e.target.value })} />

          <Button onClick={handleUpdatePrice} disabled={saving}>
            {saving ? "Saving..." : "Update"}
          </Button>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pricing</DialogTitle>
            <DialogDescription>{editingProduct?.name}</DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-3">
              <Input
                type="number"
                value={editingProduct.mrp}
                onChange={(e) => setEditingProduct({ ...editingProduct, mrp: +e.target.value })}
                placeholder="MRP"
              />
              <Input
                type="number"
                value={editingProduct.sellingPrice}
                onChange={(e) => setEditingProduct({ ...editingProduct, sellingPrice: +e.target.value })}
                placeholder="Selling Price"
              />
              <Button
                onClick={() => {
                  setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
                  setEditingProduct(null);
                }}
              >
                Save
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

