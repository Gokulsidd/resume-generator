"use client";
import Header from "@/components/header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col gap-y-2">
      <Header />
      <div>{children}</div>
    </div>
  );
}
