"use client";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "./dashboard/page";
import Header from "@/components/header";
import SurveyForm from "./form/page";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;
  return (
    <div className="flex flex-col">
      <Header />
      <SurveyForm />
    </div>
  );
}
