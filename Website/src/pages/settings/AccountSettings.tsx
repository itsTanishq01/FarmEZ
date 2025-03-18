
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AccountSettings = () => {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          View and update your account details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-muted-foreground text-sm">Name</Label>
            <div className="font-medium">{user?.name || "User"}</div>
          </div>
          
          <div>
            <Label className="text-muted-foreground text-sm">Email</Label>
            <div className="font-medium">{user?.email || "user@example.com"}</div>
          </div>
          
          <Button variant="outline" className="mt-4">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
