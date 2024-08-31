import SelectCake from "../../modules/Home/cake";
import Head from "next/head";

// export const metadata = {
//   title: "Home",
// };

export default function CakeSelectPage() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <SelectCake />
      </main>
    </div>
  );
}
