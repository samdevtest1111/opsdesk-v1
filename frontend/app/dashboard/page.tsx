"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // TEMP guard: relies on session/cookie set by backend
    // If not authenticated, backend redirect will send user to /login
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    }).then((res) => {
      if (!res.ok) router.push("/login");
    });
  }, [router]);

  return <h1>Dashboard</h1>;
}
