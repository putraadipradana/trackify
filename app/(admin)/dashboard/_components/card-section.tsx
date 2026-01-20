import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CardSection() {
  return (
    <div>
      <div className="mt-10 flex items-end justify-between">
        <h2 className="text-base/7 font-semibold sm:text-sm/6">Overview</h2>
      </div>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <Separator />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
            Total Revenue
          </div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
            $2.6M
          </div>
          <div className="mt-3 text-sm/6 sm:text-xs/6 flex items-center space-x-1.5">
            <Badge className="px-1 rounded-md bg-emerald-400/20 text-emerald-300">
              +4.5%
            </Badge>
            <span className="text-muted-foreground">from last week</span>
          </div>
        </div>
        <div>
          <Separator />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
            Average order value
          </div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
            $455
          </div>
          <div className="mt-3 text-sm/6 sm:text-xs/6 flex items-center space-x-1.5">
            <Badge variant={"destructive"} className="px-1 rounded-md">
              -0.5%
            </Badge>
            <span className="text-muted-foreground">from last week</span>
          </div>
        </div>
        <div>
          <Separator />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
            Tickets sold
          </div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
            5,888
          </div>
          <div className="mt-3 text-sm/6 sm:text-xs/6 flex items-center space-x-1.5">
            <Badge className="px-1 rounded-md bg-emerald-400/20 text-emerald-300">
              +4.5%
            </Badge>
            <span className="text-muted-foreground">from last week</span>
          </div>
        </div>
        <div>
          <Separator />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
            Pageviews
          </div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
            823,067
          </div>
          <div className="mt-3 text-sm/6 sm:text-xs/6 flex items-center space-x-1.5">
            <Badge className="px-1 rounded-md bg-emerald-400/20 text-emerald-300">
              +21.2
            </Badge>
            <span className="text-muted-foreground">from last week</span>
          </div>
        </div>
      </div>
    </div>
  );
}
