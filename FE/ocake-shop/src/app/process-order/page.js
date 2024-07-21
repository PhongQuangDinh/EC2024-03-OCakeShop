import ProcessOrder from "@/modules/Order/ProcessOrder";
import Head from "next/head";

export const metadata = {
  title: "Process Order",
};

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <ProcessOrder />
      </main>
    </div>
  );
}
