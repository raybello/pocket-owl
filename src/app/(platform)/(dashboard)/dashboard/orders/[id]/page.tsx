import { OrderDetails } from "~/components/new/order-details";
import { PageHeader } from "~/components/new/page-header";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading={`Order #${params.id}`}
        text="View your order details and tracking information."
      />
      <OrderDetails orderId={params.id} />
    </div>
  );
}
