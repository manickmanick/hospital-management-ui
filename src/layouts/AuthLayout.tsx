import { Activity, CalendarCheck, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 lg:grid lg:grid-cols-2">
      <section className="hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500">
        <div>
          <div className="flex items-center gap-3 text-2xl font-bold">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20">
              <Activity />
            </span>
            HospitalMS
          </div>

          <div className="mt-24 max-w-xl">
            <p className="font-semibold uppercase tracking-[0.24em] text-blue-100">
              Smarter hospital operations
            </p>
            <h1 className="mt-5 text-5xl font-bold leading-tight text-white">
              Better care begins with better coordination.
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-50">
              Manage patients, doctors, and appointments from one secure,
              reliable workspace.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <ShieldCheck />
            <p className="mt-3 font-semibold">Secure access</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <CalendarCheck />
            <p className="mt-3 font-semibold">Simple scheduling</p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
