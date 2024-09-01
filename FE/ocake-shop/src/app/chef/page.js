import CakeProcess from "@/modules/Chef/chef";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <CakeProcess />
      </main>
    </div>
  );
}
