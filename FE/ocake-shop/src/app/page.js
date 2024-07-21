import Landing from "@/modules/Landing/landing";
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
        <Landing />
      </main>
    </div>
  );
}
