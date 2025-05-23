import CartPage from "@/modules/Cart/cartpage";
import HomePage from "@/modules/Home/home";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <CartPage />
      </main>
    </div>
  );
}
