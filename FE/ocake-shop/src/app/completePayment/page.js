import HomePage from "@/modules/CompletePayment/completePayment";
import Head from "next/head";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <HomePage />
      </main>
    </div>
  );
}
