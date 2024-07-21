import Checkout from "@/modules/Checkout/Checkout";
import Head from "next/head";

export const metadata = {
  title: "Checkout",
};

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <Checkout />
      </main>
    </div>
  );
}
