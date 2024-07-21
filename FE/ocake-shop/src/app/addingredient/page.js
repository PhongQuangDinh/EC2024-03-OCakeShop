import AddIngredient from "@/modules/AddIngredient/addIngredient";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <AddIngredient />
      </main>
    </div>
  );
}
