import { useNavigate, Navigate, useLocation } from "react-router-dom";

import { cn } from "../lib/cn";
import { styles } from "../lib/styles";

import LoginForm from "../components/auth/LoginForm";
import AuthBrandPanel from "../components/auth/AuthBrandPanel.tsx";
import { useAuth } from "../features/auth/use-auth.ts";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading} = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/dashboard";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white via-slate-50 to-slate-100" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-105 w-105 rounded-full bg-sky-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-105 w-105 rounded-full bg-violet-200/25 blur-3xl" />

      <div
        className={cn(
          styles.glassPanel,
          "relative z-10 w-full max-w-6xl overflow-hidden rounded-[40px] p-5 md:p-6"
        )}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <AuthBrandPanel />

          <div
            className={cn(
              styles.glassCard,
              "rounded-4xl bg-white/76 p-7 md:p-9"
            )}
          >
            <LoginForm onSuccess={() => navigate(from, { replace: true })} />
          </div>
        </div>
      </div>
    </div>
  );
}