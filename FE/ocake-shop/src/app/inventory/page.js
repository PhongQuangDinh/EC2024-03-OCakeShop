import InventoryPage from "../../modules/Inventory/inventory";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <InventoryPage />
      </main>
    </div>
  );
}
