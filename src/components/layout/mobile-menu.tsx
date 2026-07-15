"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
    isLoggedIn: boolean;
}

export default function MobileMenu({
    isLoggedIn,
}: Props) {
    const router = useRouter();

    const [query, setQuery] = useState("");

    function handleSearch(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!query.trim()) return;

        router.push(
            `/search?q=${encodeURIComponent(query)}`
        );

        setQuery("");
    }

    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger className="rounded-md p-2 hover:bg-accent">
                    <Menu size={24} />
                </SheetTrigger>

                <SheetContent side="left" className="w-80 p-3">

                    <div className="mt-10 flex flex-col gap-6">

                        <Link
                            href="/"
                            className="text-lg font-semibold"
                        >
                            Home
                        </Link>

                        <Link
                            href="/movies"
                            className="text-lg font-semibold"
                        >
                            Movies
                        </Link>

                        <Link
                            href="/tv"
                            className="text-lg font-semibold"
                        >
                            TV Shows
                        </Link>


                        {isLoggedIn && (
                            <Link
                                href="/watchlist"
                                className="text-lg font-semibold"
                            >
                                ❤️ Watchlist
                            </Link>
                        )}


                        {!isLoggedIn && (
                            <Link
                                href="/login"
                                className="text-lg font-semibold"
                            >
                                Sign In
                            </Link>
                        )}


                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-3 rounded-lg border px-4 py-3"
                        >
                            <Search size={18} />

                            <input
                                value={query}
                                onChange={(e) =>
                                    setQuery(e.target.value)
                                }
                                placeholder="Search movies..."
                                className="flex-1 bg-transparent outline-none"
                            />

                        </form>

                    </div>

                </SheetContent>

            </Sheet>
        </div>
    );
}