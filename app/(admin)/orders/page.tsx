import { getOrdersFn } from "@/server/orders";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import CreateOrderForm from "./_components/forms/create-order-form";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <TableSection />
      </Suspense>
    </div>
  );
}

async function TableSection() {
  const data = await getOrdersFn();
  return <DataTable columns={columns} data={data} />;
}

function PageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl/8 font-medium sm:text-2xl/8 tracking-tight">
          Orders
        </h1>
        <h3 className="text-baseline text-muted-foreground">
          Lorem ipsum dolor sit amet.
        </h3>
      </div>
      <CreateOrderForm />
    </div>
  );
}
