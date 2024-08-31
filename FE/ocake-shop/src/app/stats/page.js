import StatisticsPage from "../..Stats/modules/Stats/Stats";
import Head from "next/head";

export const metadata = {
  title: "Statistics",
};

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <StatisticsPage />
      </main>
    </div>
  );
}
