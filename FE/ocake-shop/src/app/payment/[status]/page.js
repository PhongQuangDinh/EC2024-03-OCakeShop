import PaymentStatus from "@/modules/Payment/PaymentStatus";
import Head from "next/head";

export default function PaymentStatusPage() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <main>
        <PaymentStatus />
      </main>
    </div>
  );
}
