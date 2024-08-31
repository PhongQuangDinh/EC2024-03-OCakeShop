import CakePage from "@/modules/Home/cake";
import Head from "next/head";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <CakePage />
      </main>
    </div>
  );
}
