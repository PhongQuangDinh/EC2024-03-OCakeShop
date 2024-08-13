import ConfirmationPage from "@/modules/ConfirmDelivery/confirm";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <ConfirmationPage />
      </main>
    </div>
  );
}
