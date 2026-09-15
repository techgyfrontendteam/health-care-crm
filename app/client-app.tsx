"use client";

import dynamic from "next/dynamic";

const CrmApplication = dynamic(() => import("@/App"), {
  ssr: false,
  loading: () => (
    <main className="grid min-h-screen place-items-center bg-white text-[#111625]">
      <div className="flex items-center gap-3 text-sm font-medium">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#0022ff]" />
        Preparing your workspace
      </div>
    </main>
  ),
});

export function ClientApp() {
  return <CrmApplication />;
}
