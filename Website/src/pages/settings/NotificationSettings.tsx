
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage your notification preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <span className="text-sm text-muted-foreground">
              Receive updates and alerts for important activities
            </span>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <span className="text-sm text-muted-foreground">
              Receive notifications via email
            </span>
          </div>
          <Switch
            id="email-notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
            disabled={!notifications}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <span className="text-sm text-muted-foreground">
              Receive push notifications in your browser
            </span>
          </div>
          <Switch
            id="push-notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
            disabled={!notifications}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
