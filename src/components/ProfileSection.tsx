import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Store, MapPin, Hash } from "lucide-react";
import { Label } from "@/components/ui/label";

export const ProfileSection = () => {
  const profileData = {
    name: "Rajesh Kumar",
    mobile: "+91 9876543210",
    shopName: "Kumar Crackers Store",
    shopNumber: "SC-123",
    shopAddress: "123 Main Street, Sivakasi, Tamil Nadu 626123"
  };

  const profileFields = [
    { key: "name", label: "Name", icon: User, value: profileData.name },
    { key: "mobile", label: "Mobile Number", icon: Phone, value: profileData.mobile },
    { key: "shopName", label: "Shop Name", icon: Store, value: profileData.shopName },
    { key: "shopNumber", label: "Shop Number", icon: Hash, value: profileData.shopNumber },
    { key: "shopAddress", label: "Shop Address", icon: MapPin, value: profileData.shopAddress }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
          Profile Information
        </h2>
        <p className="text-muted-foreground mt-1">Manage your supplier profile details</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Supplier Details
          </CardTitle>
          <CardDescription>
            Your business information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileFields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.key}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-600">{field.label}</Label>
                    <p className="text-base font-semibold text-gray-900 mt-1">{field.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
