import AddCakePage from "@/modules/AddCake/addcake";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <AddCakePage />
      </main>
    </div>
  );
}
