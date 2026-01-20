"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/molecules/Footer";
import { useEffect, useState } from "react";

export function StackTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-full min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 bg-white/70 backdrop-blur transition-all dark:bg-slate-800/70 ${isSticky ? "shadow" : ""} `}
      >
        <Navbar />
      </header>
      <main className="flex grow flex-col bg-white dark:bg-slate-800">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
