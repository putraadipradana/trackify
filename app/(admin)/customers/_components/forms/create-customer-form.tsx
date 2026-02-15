/* eslint-disable react/no-children-prop */
"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconCirclePlus } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCustomerForm() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validators: {},
  });
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger asChild>
        <Button>
          <IconCirclePlus />
          Create customer
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none!">
        <DrawerHeader className="gap-1">
          <DrawerTitle>Create new customer</DrawerTitle>
          <DrawerDescription>Please fill all form</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4">
          <Separator />
          <Separator className="sm:sr-only" />
        </div>
        <DrawerFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button
                  type="submit"
                  form="create-customer-form"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? <Spinner /> : "Create customer"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </>
            )}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
