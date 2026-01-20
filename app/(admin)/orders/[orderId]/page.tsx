import { getOrderByIdFn } from "@/server/orders";
import { Suspense } from "react";
import { OrderButtonGroup } from "./_components/order-button-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IconCalendarFilled,
  IconCreditCardFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

type Params = Promise<{
  orderId: string;
}>;

export default async function Page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<OrderPageSkeleton />}>
      <OrderDetailsPage params={params} />
    </Suspense>
  );
}

async function OrderDetailsPage({ params }: { params: Params }) {
  const DATE_FORMAT = "MMMM dd, yyyy";

  const { orderId } = await params;
  const { response: order } = await getOrderByIdFn(orderId);
  const amount = parseFloat(order ? order.amount : "");

  const formatted = new Intl.NumberFormat(["id"], {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="flex flex-col gap-10">
      {order && <OrderButtonGroup id={order.id} />}
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-xl/8 font-medium sm:text-2xl/8 font-mono tracking-tight">
            {order?.orderNumber}
          </h1>
          <div className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-hover:bg-lime-400/15">
            Done
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5 mt-2.5">
          <span className="flex items-center gap-3 text-sm/6">
            <IconUserFilled className="size-5 fill-muted-foreground dark:fill-neutral-500" />
            <span>{order?.customer.name}</span>
          </span>
          <span className="flex items-center gap-3 text-sm/6">
            <IconCreditCardFilled className="size-5 fill-muted-foreground dark:fill-neutral-500" />
            <span>{formatted}</span>
          </span>
          <span className="flex items-center gap-3 text-sm/6">
            <IconCalendarFilled className="size-5 fill-muted-foreground dark:fill-neutral-500" />
            <time
              dateTime={order && format(new Date(order.createdAt), DATE_FORMAT)}
            >
              {order && format(new Date(order.createdAt), DATE_FORMAT)}
            </time>
          </span>
        </div>
      </div>
      <Separator />
      {order?.material && <DataTable columns={columns} data={order.material} />}
    </div>
  );
}

function OrderPageSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="size-8" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-34 sm:flex hidden" />
          <Skeleton className="h-8 w-34" />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <Skeleton className="w-full sm:max-w-xs max-w-60 h-7" />
          <Skeleton className="w-10 h-5" />
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-6 py-1.5 mt-4">
          <span className="flex items-center gap-3">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-28" />
          </span>
          <span className="flex items-center gap-3">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-28" />
          </span>
          <span className="flex items-center gap-3">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-28" />
          </span>
        </div>
      </div>
      <Separator />
    </div>
  );
}
