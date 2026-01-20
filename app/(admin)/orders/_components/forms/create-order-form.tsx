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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { createOrderFn } from "@/server/orders";
import { IconCirclePlus } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  orderNumber: z.string().min(1),
  amount: z.string().min(1),
});

export default function CreateOrderForm() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      orderNumber: "",
      amount: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }: { value: z.infer<typeof formSchema> }) => {
      try {
        const customerId = "aea3c6c4-31ea-4539-992e-54a87438aa1c";

        if (!customerId) {
          toast.error("You must be logged in to create order");
          return;
        }

        const response = await createOrderFn({
          ...value,
          customerId,
        });

        if (response.success) {
          form.reset();
          router.refresh();
          setTimeout(() => toast.success(response.message), 700);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setIsOpen(false), 500);
      }
    },
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
          Create order
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none!">
        <DrawerHeader className="gap-1">
          <DrawerTitle>Create new order</DrawerTitle>
          <DrawerDescription>Please fill all form</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4">
          <Separator />
          <form
            id="create-post-form"
            className="pb-5"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="orderNumber"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Order number</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Your customer purchase order
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="amount"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
          <Separator className="sm:sr-only" />
        </div>
        <DrawerFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button
                  type="submit"
                  form="create-post-form"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? <Spinner /> : "Create order"}
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
