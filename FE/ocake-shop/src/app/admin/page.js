import Admin from "@/modules/admin/admin";
import Head from "next/head";

export const metadata = {
  title: "Admin",
};

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <Admin />
      </main>
    </div>
  );
}
