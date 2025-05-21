import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function HelpDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Help</Button>
      </DrawerTrigger>
      <DrawerContent className="m-4 p-5">
        <DrawerHeader>
          <DrawerTitle>Need Help?</DrawerTitle>
          <DrawerDescription>
            Please fill out the form below. We'll get back to you soon.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input id="contact" type="tel" placeholder="+91-1234567890" />
          </div>
          <div>
            <Label htmlFor="problem">What’s the issue?</Label>
            <Input
              id="problem"
              placeholder="E.g., Payment failed, Course not loading..."
            />
          </div>
          <div>
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              placeholder="Describe your issue in detail..."
              rows={4}
            />
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
