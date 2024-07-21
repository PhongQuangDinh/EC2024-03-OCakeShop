"use client"; 
import { useState } from "react";
import SignIn from "@/modules/SignIn/signin";
import SignUp from "@/modules/SignUp/signup";
import CartPage from "@/modules/Cart/cartpage";
import Head from "next/head";

export const metadata = {
  title: "OCake Shop",
};

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <CartPage />
        
        <button onClick={() => setShowSignIn(!showSignIn)}>
          {showSignIn ? "Hide Sign In" : "Show Sign In"}
        </button>
        <button onClick={() => setShowSignUp(!showSignUp)}>
          {showSignUp ? "Hide Sign Up" : "Show Sign Up"}
        </button>
        
        {showSignIn && <SignIn />}
        {showSignUp && <SignUp />}
      </main>
    </div>
  );
} 
