"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) router.push("/dashboard/users");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1535]">
      <form
        onSubmit={handleLogin}
        className="bg-[#09183E] text-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-md bg-[#0B1F4A] border border-[#1B2B4D] text-white focus:outline-none focus:ring-2 focus:ring-[#0C6DC6]"
        />
        <input
          type="password"
          placeholder="Password (try 1234)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-md bg-[#0B1F4A] border border-[#1B2B4D] text-white focus:outline-none focus:ring-2 focus:ring-[#0C6DC6]"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#0C6DC6] to-[#158CFF] py-3 rounded-md hover:opacity-90 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
