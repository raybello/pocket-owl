import { OrdersTable } from "~/components/new/orders-table";
import { PageHeader } from "~/components/new/page-header";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader heading="Orders" text="View and manage all your orders." />
      <OrdersTable />
    </div>
  );
}
