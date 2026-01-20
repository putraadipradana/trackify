"use client";

import { Badge } from "@/components/ui/badge";
import { IconArrowDown } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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
      <Badge variant="outline" className="py-1">
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
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat(["id"], {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
];
