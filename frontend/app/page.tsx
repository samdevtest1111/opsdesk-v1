"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user has a session cookie
    const hasToken = document.cookie.includes("auth_token");

    if (hasToken) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  // Show a simple loader while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
}
