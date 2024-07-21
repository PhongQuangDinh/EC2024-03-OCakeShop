import Profile from "@/modules/Profile/Profile";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OCake Shop</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <Profile />
      </main>
    </div>
  );
}
