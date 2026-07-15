import Image from "next/image";
import Link from "next/link";
import SignOutButton from "@/components/auth/sign-out-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "@/auth";

interface Props {
  session: any;
  watchlistCount: number;
}

export default function UserMenu({
  session,
  watchlistCount
}: Props) {
  if (!session?.user) {
    return (
      <Link href="/login">
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Image
          src={session.user.image ?? "/avatar.png"}
          alt={session.user.name ?? "User"}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem disabled>
          {session.user.name}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/watchlist">
            ❤️ Watchlist {watchlistCount ? `(${watchlistCount})` : ""}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}