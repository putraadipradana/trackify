"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteOrderFn } from "@/server/orders";
import { IconArrowDown, IconDots } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export const schema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  amount: z.string(),
  priority: z.string(),
  createdAt: z.date(),
  customer: z.object({
    name: z.string(),
  }),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "orderNumber",
    header: "Order number",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return (
        <span className="text-muted-foreground">
          {format(new Date(date), "MMMM dd, yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        <IconArrowDown />
        <span className="capitalize">{row.original.priority}</span>
      </Badge>
    ),
  },
  {
    accessorKey: "submitedBy",
    header: "Submited by",
    cell: () => <span className="capitalize">Putra Adi Pradana</span>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat(["id"], {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(amount);

      return <span>{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TableActions item={row.original} />;
    },
  },
];

function TableActions({ item }: { item: z.infer<typeof schema> }) {
  const router = useRouter();

  async function DeleteOrder(orderId: string) {
    try {
      const response = await deleteOrderFn(orderId);

      if (response.success) {
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="size-8 p-0" />}
      >
        <span className="sr-only">Open menu</span>
        <IconDots className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuGroup>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(item.orderNumber)}
          >
            Copy order number
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push(`/orders/${item.id}`);
            }}
          >
            View order details
          </DropdownMenuItem>
          <DropdownMenuItem>Priority</DropdownMenuItem>
          <DropdownMenuItem>Status</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => DeleteOrder(item.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuGroup>
    </DropdownMenu>
  );
}
