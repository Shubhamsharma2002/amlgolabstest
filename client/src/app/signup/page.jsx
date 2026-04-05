"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/ui/AuthInput";
import useAuth from "@/hooks/useAuth";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  signup(form); 
};

  return (
    <AuthLayout
      title="🚀 Join Finance Tracker"
      subtitle="Start managing your money smarter"
      gradient="bg-gradient-to-br from-blue-500 to-purple-500"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account ✨
        </h2>

        <AuthInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {/*  Button with loading */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-500 font-medium">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}