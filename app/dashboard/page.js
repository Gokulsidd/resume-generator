"use client";

import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/header";
import Candidates from "./candidates/page";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();



  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }

    if (user.role != "admin") {
      router.push("/unauthorized");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex flex-col gap-y-2">
        <Candidates  />
      </div>
    </ProtectedRoute>
  );
}
