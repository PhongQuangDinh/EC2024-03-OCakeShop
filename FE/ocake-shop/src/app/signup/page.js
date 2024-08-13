import SignUp from "@/modules/SignUp/signup";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <SignUp/>
      </main>
    </div>
  );
}
