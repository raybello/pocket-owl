import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

// Mock data for orders
const orders = [
  {
    id: "16192038457",
    date: "April 11, 2025",
    product: "Official Document - Graduation Certificate",
    status: "shipped",
    progress: 65,
    total: "$65.48",
  },
  {
    id: "29012387590",
    date: "August 22, 2022",
    product: "Official Document - Transcript",
    status: "delivered",
    progress: 100,
    total: "$21.92",
  },
  {
    id: "37219384726",
    date: "December 3, 2021",
    product: "Official Document - Transcript",
    status: "delivered",
    progress: 100,
    total: "$21.92",
  },
  //   {
  //     id: "48592017381",
  //     date: "March 14, 2021",
  //     product: "Official Document - Enrolment Verification",
  //     status: "delivered",
  //     progress: 100,
  //     total: "$4.99",
  //   },
  //   {
  //     id: "58910472933",
  //     date: "December 5, 2020",
  //     product: "Official Document - Enrolment Verification",
  //     status: "delivered",
  //     progress: 100,
  //     total: "$4.99",
  //   },
  //   {
  //     id: "63827456293",
  //     date: "July 30, 2020",
  //     product: "Official Document - Enrolment Verification",
  //     status: "delivered",
  //     progress: 100,
  //     total: "$4.99",
  //   },
  //   {
  //     id: "79561738290",
  //     date: "October 19, 2019",
  //     product: "Official Document - Transcript",
  //     status: "delivered",
  //     progress: 100,
  //     total: "$14.99",
  //   },
];

export function OrderSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {orders.map((order) => (
        <Link href={`/dashboard/orders/${order.id}`} key={order.id}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Order #{order.id}
              </CardTitle>
              <StatusBadge status={order.status} />
            </CardHeader>
            <CardContent>
              <div className="text-sm">{order.date}</div>
              <div className="mt-2 line-clamp-1 font-medium">
                {order.product}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span className="font-medium capitalize">{order.status}</span>
                </div>
                <Progress value={order.progress} className="h-1" />
              </div>
              <div className="mt-4 text-sm font-semibold">
                Total: {order.total}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    placed: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    preparing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    delivered: "bg-green-100 text-green-800 hover:bg-green-100",
  };

  return (
    <Badge variant="outline" className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
