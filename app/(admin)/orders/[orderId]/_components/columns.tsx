"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const schema = z.object({
  id: z.string(),
  number: z.string(),
  description: z.string(),
  qty: z.string(),
  status: z.string(),
  createdAt: z.date(),
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
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
];
