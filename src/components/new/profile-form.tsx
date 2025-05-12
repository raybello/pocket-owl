import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function ProfileForm() {
  return (
    <Tabs defaultValue="personal">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal Information</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" defaultValue="Raymond" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" defaultValue="Bello" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="rbell024@uottawa.ca"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="2899254702" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="addresses">
        <Card>
          <CardHeader>
            <CardTitle>Addresses</CardTitle>
            <CardDescription>
              Manage your shipping and billing addresses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Shipping Address</Label>
              <Card className="p-4">
                <div className="space-y-1">
                  <div>Raymond Bello</div>
                  <div>1161 Heron Rd</div>
                  <div>Ottawa, Ontario K1V 2S9</div>
                  <div>Canada</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
            <div className="space-y-2">
              <Label>Billing Address</Label>
              <Card className="p-4">
                <div className="space-y-1">
                  <div>Same as shipping address</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </Card>
            </div>
            <Button variant="outline">Add New Address</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value="********" />
            </div>
            <Button variant="outline">Change Password</Button>

            <div className="space-y-2 pt-4">
              <Label>Email Preferences</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="order-updates"
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked
                  />
                  <Label
                    htmlFor="order-updates"
                    className="text-sm font-normal"
                  >
                    Order updates
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="promotions"
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked
                  />
                  <Label htmlFor="promotions" className="text-sm font-normal">
                    Promotions and sales
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="newsletter" className="text-sm font-normal">
                    Newsletter
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
