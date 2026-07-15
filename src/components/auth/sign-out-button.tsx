"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="w-full text-left"
    >
      Sign Out
    </button>
  );
}