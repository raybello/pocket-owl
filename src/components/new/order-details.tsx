"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";


// Mock order data
const orderData = {
  "16192038457": {
    id: "16192038457",
    date: "April 11, 2025",
    product: "Official Document - Graduation Certificate",
    sku: "DOC-GRAD-06834",
    preview: true,
    preview_path: "images/Georgian_College_Student_Life_1-1400x933.jpg",
    color: "N/A",
    quantity: 1,
    status: "shipped",
    progress: 65,
    tracking: "TRK16192038457",
    deliveryMethod: "Express Mail",
    shippedTo: "1161 Heron Rd, Ottawa, Ontario K1V 2S9",
    subtotal: "$49.99",
    shipping: "$0.00",
    tax: "$0.00",
    total: "$49.99",
    contact: {
      name: "Raymond Bello",
      email: "rbell024@uottawa.ca",
      phone: "2899254702",
    },
  },
  "29012387590": {
    id: "29012387590",
    date: "August 22, 2022",
    product: "Official Document - Transcript",
    sku: "DOC-TRNS-34532",
    color: "N/A",
    quantity: 1,
    preview: false,
    status: "delivered",
    progress: 100,
    tracking: "TRK29012387590",
    deliveryMethod: "Standard Mail",
    shippedTo: "1161 Heron Rd, Ottawa, Ontario K1V 2S9",
    subtotal: "$14.99",
    shipping: "$0.00",
    tax: "$0.00",
    total: "$14.99",
    contact: {
      name: "Raymond Bello",
      email: "rbell024@uottawa.ca",
      phone: "2899254702",
    },
  },
  "37219384726": {
    id: "37219384726",
    date: "December 3, 2021",
    product: "Official Document - Transcript",
    sku: "DOC-TRNS-87464",
    color: "N/A",
    quantity: 1,
    status: "delivered",
    preview: false,
    progress: 100,
    tracking: "TRK37219384726",
    deliveryMethod: "Standard Mail",
    shippedTo: "1161 Heron Rd, Ottawa, Ontario K1V 2S9",
    subtotal: "$14.99",
    shipping: "$0.00",
    tax: "$0.00",
    total: "$14.99",
    contact: {
      name: "Raymond Bello",
      email: "rbell024@uottawa.ca",
      phone: "2899254702",
    },
  },
};

export function OrderDetails({ orderId }: { orderId: string }) {
  const order = orderData[orderId as keyof typeof orderData] || {
    id: orderId,
    date: "Unknown",
    product: "Unknown Product",
    sku: "Unknown",
    color: "Unknown",
    quantity: 0,
    status: "unknown",
    progress: 0,
    tracking: "",
    deliveryMethod: "Unknown",
    shippedTo: "Unknown",
    subtotal: "$0.00",
    shipping: "$0.00",
    tax: "$0.00",
    total: "$0.00",
    contact: {
      name: "Unknown",
      email: "unknown@example.com",
      phone: "Unknown",
    },
  };

  const [showPDF, setShowPDF] = useState(false);

  const pdfFile = "/dummy.pdf";

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = pdfFile;
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[-:T]/g, "") // Remove dashes, colons, and 'T'
      .split(".")[0]!; // Remove milliseconds
    const formattedFilename = `${timestamp.slice(0, 8)}_${timestamp.slice(8)}.pdf`;

    link.download = formattedFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Order #{order.id}</CardTitle>
            <Badge variant="outline" className={getStatusClass(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                {/* <div className="h-16 w-16 rounded-md border bg-muted">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt={order.product}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div> */}
                <div>
                  <div className="font-medium">{order.product}</div>
                  <div className="text-sm text-muted-foreground">
                    SKU: {order.sku}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Quantity: {order.quantity}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Order Placed</span>
                    <span className="font-medium">Preparing Shipment</span>
                    <span className="font-medium">Shipped</span>
                    <span className="font-medium">Delivered</span>
                  </div>
                </div>
                <Progress value={order.progress} className="h-2" />
              </div>

              {/* {order.tracking && (
                <Button className="w-full">TRACK PACKAGE</Button>
              )} */}

              {order.preview && (
                <Button size="lg" className="w-full" onClick={handleDownload}>
                  <Download className="mr-2 h-5 w-5" />
                  Preview Document
                </Button>
              )}

              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Tracking: {order.tracking || "Not available yet"}
                </div>
                <div className="text-sm">
                  Delivery Method: {order.deliveryMethod}
                </div>
                <div className="text-sm">Shipped to: {order.shippedTo}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Order Subtotal:</span>
                <span>{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling:</span>
                <span>{order.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax:</span>
                <span>{order.tax}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Order Total:</span>
                <span>{order.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Contact Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>{order.contact.name}</div>
              <div>{order.contact.email}</div>
              <div>{order.contact.phone}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatusClass(status: string): string {
  const variants: Record<string, string> = {
    placed: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    preparing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    delivered: "bg-green-100 text-green-800 hover:bg-green-100",
    unknown: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };

  return (variants[status] ?? variants.unknown)!;
}
