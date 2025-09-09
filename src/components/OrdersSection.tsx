
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, Search, ShoppingCart, Calendar, Package, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Order {
  id: string;
  orderId: string;
  orderDate: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  buyerName: string;
  buyerCity: string;
  deliveryLocation: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export const OrdersSection = () => {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderId: "ORD-2024-001",
      orderDate: "2024-01-15",
      status: "confirmed",
      buyerName: "Rahul Sharma",
      buyerCity: "Mumbai",
      deliveryLocation: "Shop No. 15, Linking Road, Bandra West, Mumbai - 400050",
      items: [
        { productName: "Red Flower Pot", quantity: 10, price: 150 },
        { productName: "7cm Sparkler", quantity: 5, price: 80 }
      ],
      totalAmount: 1900
    },
    {
      id: "2",
      orderId: "ORD-2024-002",
      orderDate: "2024-01-16",
      status: "shipped",
      buyerName: "Priya Patel",
      buyerCity: "Delhi",
      deliveryLocation: "Block A-25, Lajpat Nagar, New Delhi - 110024",
      items: [
        { productName: "Rocket Small", quantity: 3, price: 200 },
        { productName: "Green Flower Pot", quantity: 8, price: 160 }
      ],
      totalAmount: 1880
    },
    {
      id: "3",
      orderId: "ORD-2024-003",
      orderDate: "2024-01-17",
      status: "pending",
      buyerName: "Amit Kumar",
      buyerCity: "Bangalore",
      deliveryLocation: "HSR Layout, Sector 2, Bangalore - 560102",
      items: [
        { productName: "12cm Sparkler", quantity: 15, price: 120 }
      ],
      totalAmount: 1800
    },
    {
      id: "4",
      orderId: "ORD-2024-004",
      orderDate: "2024-01-18",
      status: "delivered",
      buyerName: "Sneha Singh",
      buyerCity: "Pune",
      deliveryLocation: "Koregaon Park, Pune - 411001",
      items: [
        { productName: "Red Flower Pot", quantity: 6, price: 150 },
        { productName: "Rocket Small", quantity: 4, price: 200 }
      ],
      totalAmount: 1700
    },
    {
      id: "5",
      orderId: "ORD-2024-005",
      orderDate: "2024-01-19",
      status: "cancelled",
      buyerName: "Vikash Gupta",
      buyerCity: "Chennai",
      deliveryLocation: "T. Nagar, Chennai - 600017",
      items: [
        { productName: "Green Flower Pot", quantity: 12, price: 160 }
      ],
      totalAmount: 1920
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cartonCount, setCartonCount] = useState<{ [key: string]: number }>({});
  const [packingStatus, setPackingStatus] = useState<{ [key: string]: boolean }>({});

  // Hydrate saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedCartons = localStorage.getItem("orders_cartonCount");
      const savedPacked = localStorage.getItem("orders_packingStatus");
      if (savedCartons) {
        const parsedCartons = JSON.parse(savedCartons) as { [key: string]: number };
        setCartonCount(parsedCartons || {});
      }
      if (savedPacked) {
        const parsedPacked = JSON.parse(savedPacked) as { [key: string]: boolean };
        setPackingStatus(parsedPacked || {});
      }
    } catch (e) {
      console.error("Failed to load saved order state", e);
    }
  }, []);

  // Persist cartonCount changes
  useEffect(() => {
    try {
      localStorage.setItem("orders_cartonCount", JSON.stringify(cartonCount));
    } catch (e) {
      console.error("Failed to save cartonCount", e);
    }
  }, [cartonCount]);

  // Persist packingStatus changes
  useEffect(() => {
    try {
      localStorage.setItem("orders_packingStatus", JSON.stringify(packingStatus));
    } catch (e) {
      console.error("Failed to save packingStatus", e);
    }
  }, [packingStatus]);

  // Auto-save functionality with improved feedback
  const savePackagingInfo = async (orderId: string, cartons?: number, packed?: boolean) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`Saving packaging info for order ${orderId}:`, {
        cartons: cartons !== undefined ? cartons : cartonCount[orderId],
        packed: packed !== undefined ? packed : packingStatus[orderId]
      });
      
      // Show success feedback only for significant changes
      if (cartons !== undefined && cartons > 0) {
        console.log(`✅ Carton count saved: ${cartons}`);
      }
      if (packed !== undefined) {
        console.log(`✅ Packing status saved: ${packed ? 'Packed' : 'Not Packed'}`);
      }
      
    } catch (error) {
      console.error('Error saving packaging info:', error);
      // In a real app, you might want to show an error toast here
    }
  };

  const handleCartonCountChange = (orderId: string, value: number) => {
    setCartonCount(prev => ({ ...prev, [orderId]: value }));
    // Auto-save after a short delay to avoid excessive API calls
    setTimeout(() => savePackagingInfo(orderId, value), 800);
  };

  const handlePackingStatusChange = (orderId: string, value: boolean) => {
    setPackingStatus(prev => ({ ...prev, [orderId]: value }));
    // Auto-save immediately for boolean changes
    savePackagingInfo(orderId, undefined, value);
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.buyerCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">My Orders</h2>
          <p className="text-muted-foreground mt-1">Track and manage all your orders</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Order Management
          </CardTitle>
          <CardDescription>
            View detailed information about all orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Badge variant="secondary" className="text-sm">
                {filteredOrders.length} entries found
              </Badge>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">S.No</TableHead>
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Order Date</TableHead>
                  <TableHead className="font-semibold">Buyer Name</TableHead>
                  <TableHead className="font-semibold">Buyer City</TableHead>
                  <TableHead className="font-semibold">Order Status</TableHead>
                  <TableHead className="font-semibold">Cartons</TableHead>
                  <TableHead className="font-semibold">Packed</TableHead>
                  <TableHead className="font-semibold">View Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-mono text-sm">{order.orderId}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{order.buyerName}</TableCell>
                    <TableCell className="text-muted-foreground">{order.buyerCity}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={cartonCount[order.id] || ""}
                        onChange={(e) => handleCartonCountChange(order.id, parseInt(e.target.value) || 0)}
                        className="w-20 h-8 text-sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={packingStatus[order.id] || false}
                          onCheckedChange={(checked) => handlePackingStatusChange(order.id, checked)}
                        />
                        <CheckCircle className={`h-4 w-4 ${packingStatus[order.id] ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                          >
                            <Eye className="h-4 w-4 text-primary" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                              Complete information for {order.orderId}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-gray-700">Order Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Order ID:</span> {selectedOrder.orderId}</p>
                                    <p><span className="font-medium">Date:</span> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                                    <p><span className="font-medium">Status:</span> 
                                      <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)}`}>
                                        {getStatusText(selectedOrder.status)}
                                      </Badge>
                                    </p>
                                    <p><span className="font-medium">Total Crackers:</span> {selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                                    <p><span className="font-medium">Total Amount:</span> ₹{selectedOrder.totalAmount}</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-gray-700">Buyer Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Buyer Name:</span> {selectedOrder.buyerName}</p>
                                    <p><span className="font-medium">City:</span> {selectedOrder.buyerCity}</p>
                                    <p><span className="font-medium">Delivery Location:</span> {selectedOrder.deliveryLocation}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="font-semibold text-gray-700">Order Items</h4>
                                <div className="rounded-lg border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-gray-50">
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedOrder.items.map((item, itemIndex) => (
                                        <TableRow key={itemIndex}>
                                          <TableCell className="font-medium">{item.productName}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>₹{item.price}</TableCell>
                                          <TableCell className="font-semibold">₹{item.quantity * item.price}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
