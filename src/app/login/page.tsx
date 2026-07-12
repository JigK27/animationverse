import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
        >
          Sign in with Google
        </button>
      </form>
    </main>
  );
}