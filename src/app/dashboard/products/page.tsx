"use client";

import ProductList from "./ProductList";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Products() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  return (
    <div className="p-4">
      <p>Welcome, {session?.user?.name || "user"}!</p>
      <ProductList />
    </div>
  );
}
