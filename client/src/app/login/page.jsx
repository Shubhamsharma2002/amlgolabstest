"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/ui/AuthInput";
import AuthButton from "@/components/ui/AuthButton";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form); 
  };

  return (
    <AuthLayout
      title="💰 Finance Tracker App"
      subtitle="Track your expenses smartly"
      gradient="bg-gradient-to-br from-purple-500 to-blue-500"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <div className="text-right mb-4 text-sm text-blue-500 cursor-pointer">
         <Link href='/forgot-password'>Forgot Password?</Link>
        </div>

        {/* 🔹 Button with loading */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          New user?{" "}
          <Link href="/signup" className="text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}