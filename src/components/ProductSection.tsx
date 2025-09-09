
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
  price: number;
}

export const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", category: "Sound Crackers", name: "Thunder King 1000 Wala", price: 250 },
    { id: "2", category: "Sparklers", name: "Golden Sparklers Pack", price: 120 },
    { id: "3", category: "Rockets", name: "Rocket Bombs Deluxe", price: 180 },
    { id: "4", category: "Fountains", name: "Flower Pot Fountains", price: 160 },
    { id: "5", category: "Chakras", name: "Chakra Wheels Supreme", price: 200 },
    { id: "6", category: "Kids Special", name: "Snake Tablets Giant", price: 80 },
    { id: "7", category: "Fancy Items", name: "Heart Shape Crackers", price: 150 },
    { id: "8", category: "Gift Boxes", name: "Diwali Special Gift Box", price: 500 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [savingPrices, setSavingPrices] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const [updateForm, setUpdateForm] = useState({
    category: "",
    name: "",
    price: ""
  });

  const categories = ["Sound Crackers", "Sparklers", "Rockets", "Fountains", "Chakras", "Kids Special", "Fancy Items", "Gift Boxes"];
  
  const productsByCategory = {
    "Sound Crackers": ["Thunder King 1000 Wala", "Atom Bomb Special", "Double Sound Crackers", "Bullet Bomb Classic"],
    "Sparklers": ["Golden Sparklers Pack", "Color Sparklers Deluxe", "Electric Sparklers"],
    "Rockets": ["Rocket Bombs Deluxe", "Whistling Rockets", "Color Burst Rockets"],
    "Fountains": ["Flower Pot Fountains", "Multi-Color Fountain", "Golden Fountain Supreme"],
    "Chakras": ["Chakra Wheels Supreme", "Fire Chakra Deluxe", "Multi-Spin Chakra"],
    "Kids Special": ["Snake Tablets Giant", "Pop Pop Crackers", "Butterfly Crackers"],
    "Fancy Items": ["Heart Shape Crackers", "Star Burst Fancy", "Flower Shape Deluxe"],
    "Gift Boxes": ["Diwali Special Gift Box", "Family Fun Gift Box"]
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveProductPrice = async (productId: string, newPrice: number) => {
    setSavingPrices(prev => ({ ...prev, [productId]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Saving product price: ${productId} = ₹${newPrice}`);
      
      toast({
        title: "Price Updated",
        description: "Product price has been saved successfully.",
      });
      
    } catch (error) {
      console.error('Error saving product price:', error);
      toast({
        title: "Error",
        description: "Failed to save product price. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingPrices(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleUpdatePrice = async () => {
    if (updateForm.category && updateForm.name && updateForm.price) {
      const existingProduct = products.find(p => 
        p.category === updateForm.category && p.name === updateForm.name
      );
      
      if (existingProduct) {
        const newPrice = parseFloat(updateForm.price);
        setProducts(products.map(product => 
          product.id === existingProduct.id 
            ? { ...product, price: newPrice } 
            : product
        ));
        
        await saveProductPrice(existingProduct.id, newPrice);
        setUpdateForm({ category: "", name: "", price: "" });
      }
    }
  };

  const handleEditProduct = async (id: string, newPrice: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, price: newPrice } : product
    ));
    
    await saveProductPrice(id, newPrice);
    setEditingProduct(null);
  };

  const availableProducts = updateForm.category ? products.filter(p => p.category === updateForm.category).map(p => p.name) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Product Management</h2>
          <p className="text-muted-foreground mt-1">Manage your cracker inventory and pricing</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Product Inventory
          </CardTitle>
          <CardDescription>
            View and manage all your cracker products
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Badge variant="secondary" className="text-sm">
                {filteredProducts.length} entries found
              </Badge>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">S.No</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Product Name</TableHead>
                  <TableHead className="font-semibold">Price (₹)</TableHead>
                  <TableHead className="font-semibold">Tools</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-semibold text-green-600 flex items-center gap-2">
                      ₹{product.price}
                      {savingPrices[product.id] && (
                        <Save className="h-3 w-3 text-blue-500 animate-spin" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Edit2 className="h-4 w-4 text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-primary" />
            Update Product Price
          </CardTitle>
          <CardDescription>
            Update pricing for existing products in your inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={updateForm.category} onValueChange={(value) => setUpdateForm({...updateForm, category: value, name: ""})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Select value={updateForm.name} onValueChange={(value) => setUpdateForm({...updateForm, name: value})} disabled={!updateForm.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => (
                    <SelectItem key={product} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Original Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter new price"
                value={updateForm.price}
                onChange={(e) => setUpdateForm({...updateForm, price: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button 
                onClick={handleUpdatePrice} 
                className="w-full gradient-bg border-0 hover:opacity-90"
                disabled={!updateForm.category || !updateForm.name || !updateForm.price}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Update Price
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product Price</DialogTitle>
            <DialogDescription>
              Update the price for {editingProduct?.name}
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input value={editingProduct.name} disabled />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={editingProduct.category} disabled />
              </div>
              <div className="space-y-2">
                <Label>New Price (₹)</Label>
                <Input
                  type="number"
                  defaultValue={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleEditProduct(editingProduct.id, editingProduct.price)} 
                  className="gradient-bg border-0"
                  disabled={savingPrices[editingProduct.id]}
                >
                  {savingPrices[editingProduct.id] ? (
                    <>
                      <Save className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Update Price
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
