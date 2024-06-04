import Link from "next/link";
import React from "react";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2 px-4">
      <Link href="/" className="flex items-center gap-3">
        <h1 className="font-logo text-2xl font-black">Principles</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Button variant={"ghost"} asChild>
          <Link href="/principles">Your Principles</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href="/library">Library</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href="/about">About</Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
