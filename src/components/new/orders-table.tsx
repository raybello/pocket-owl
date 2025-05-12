"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

// Mock data for orders
const orders = [
  {
    id: "16192038457",
    date: "April 11, 2025",
    product: "Official Document - Graduation Certificate",
    status: "shipped",
    progress: 60,
    total: "$49.99",
  },
  {
    id: "29012387590",
    date: "August 22, 2022",
    product: "Official Document - Transcript",
    status: "delivered",
    progress: 100,
    total: "$14.99",
  },
  {
    id: "37219384726",
    date: "December 3, 2021",
    product: "Official Document - Transcript",
    status: "delivered",
    progress: 100,
    total: "$14.99",
  },
];

export function OrdersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          You have placed {orders.length} orders recently.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="hidden md:table-cell">Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-primary hover:underline"
                  >
                    #{order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                  {order.product}
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(order.id)}
                      >
                        Copy order ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>View invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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
