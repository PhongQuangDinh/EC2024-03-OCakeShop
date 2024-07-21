import PurchaseOrderProcess from "@/modules/PurchaseOrderProcess/PurchaseOrderProcess";
import Head from "next/head";

export const metadata = {
  title: "PurchaseOrderProcess",
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <PurchaseOrderProcess />
      </main>
    </div>
  );
}
