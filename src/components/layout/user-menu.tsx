import Image from "next/image";
import Link from "next/link";

import { signOut } from "@/auth";

interface Props {
  session: any;
}

export default function UserMenu({
  session,
}: Props) {
  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "User"}
          width={36}
          height={36}
          className="rounded-full"
        />
      )}

      <span className="hidden md:block">
        {session.user.name}
      </span>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="rounded-lg border px-3 py-2">
          Logout
        </button>
      </form>
    </div>
  );
}