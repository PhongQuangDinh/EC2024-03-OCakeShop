import PurchaseOrderComplete from "@/modules/PurchaseOrderComplete/PurchaseOrderComplete";
import Head from "next/head";

export const metadata = {
  title: "PurchaseOrderComplete",
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <PurchaseOrderComplete />
      </main>
    </div>
  );
}
