import { getOrdersFn } from "@/server/orders";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import CreateOrderForm from "./_components/forms/create-order-form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <TableSection />
    </Suspense>
  );
}

async function TableSection() {
  const data = await getOrdersFn();
  return (
    <div className="flex flex-col gap-10">
      <PageHeader />
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  );
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

function OrdersPageSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3 w-full">
          <div>
            <Skeleton className="w-full max-w-20 h-7" />
          </div>
          <div>
            <Skeleton className="h-5 w-full max-w-52" />
          </div>
        </div>
        <Skeleton className="h-9 w-full max-w-26" />
      </div>
      <Separator />
      <div>
        <Skeleton className="sm:max-w-sm w-full h-9" />
      </div>
    </div>
  );
}
