import SignIn from "@/modules/SignIn/signin";
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
        <SignIn/>
      </main>
    </div>
  );
}
