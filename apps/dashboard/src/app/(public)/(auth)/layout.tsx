import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Auth",
};

type AuthLayoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/d");
  }

  return (
    <div>
      <section className="flex min-h-screen w-full items-center justify-center p-6 md:p-0 bg-neutral-100">
        <div className="m-auto flex w-full max-w-md flex-col space-y-6 p-4 lg:px-5">
          {children}
        </div>
      </section>
    </div>
  );
}
