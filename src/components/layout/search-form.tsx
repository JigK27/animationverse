"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchForm() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  function handleSubmit(
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
    <form
      onSubmit={handleSubmit}
      className="hidden items-center gap-2 rounded-full border bg-background/60 px-4 py-2 md:flex"
    >
      <Search size={18} />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-48 bg-transparent outline-none"
      />
    </form>
  );
}