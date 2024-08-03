

import SignIn from "@/modules/SignIn/signin";
import SignUp from "@/modules/SignUp/signup";
import CartPage from "@/modules/Cart/cartpage";
import ConfirmationPage from "@/modules/ConfirmDelivery/confirm";
import InventoryPage from "@/modules/Inventory/inventory";
import AddCakePage from "@/modules/AddCake/addcake";
import Head from "next/head";

export const metadata = {
  title: "OCake Shop",
};

export default function Home() {


  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <AddCakePage />
        
     
      </main>
    </div>
  );
} 