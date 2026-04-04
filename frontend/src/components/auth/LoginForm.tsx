import { useState } from "react";

import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";
import { useAuth } from "../../features/auth/use-auth";

type LoginFormProps = {
  onSuccess?: () => void;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unable to sign in";
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      onSuccess?.();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div>
        <h2 className="mt-10 text-[1.9rem] font-semibold tracking-tight text-slate-900">
          Sign in
        </h2>
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-500">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            className={styles.input}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-500">
              Password
            </label>

            <button
              type="button"
              className="text-xs font-medium text-slate-500 transition hover:text-slate-800"
              onClick={() => {
                alert("Forgot password feature coming soon");
              }}
            >
              Forgot password?
            </button>
          </div>

          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            className={styles.input}
          />
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3">
          <p className="text-sm text-rose-500">{error}</p>
        </div>
      ) : null}

      <div className="mt-12">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(styles.primaryButton, "w-full disabled:opacity-60")}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}