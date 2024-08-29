import SignIn from "@/modules/SignIn/signin";
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
        <SignIn />
      </main>
    </div>
  );
} 