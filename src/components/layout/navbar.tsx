import Link from "next/link";

import { auth } from "@/auth";

import ThemeToggle from "@/components/theme/theme-toggle";
import SearchForm from "./search-form";
import UserMenu from "./user-menu";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-xl font-bold md:text-2xl"
        >
          🎬 AnimationVerse
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/movies">Movies</Link>
          <Link href="/tv">TV Shows</Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <SearchForm />

          <UserMenu session={session} />
        </div>
      </div>
    </nav>
  );
}