import { OrderSummary } from "~/components/new/order-summary";
import { PageHeader } from "~/components/new/page-header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Summary"
        text="View all your orders and their shipping status."
      />
      <OrderSummary />
    </div>
  );
}
