"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/ui/AuthInput";
import useAuth from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({
    email: "", // Email is now the identifier
    newPassword: "",
    confirmPassword: "",
  });

  const { forgotPassword, loading } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match! ❌");
      return;
    }

    // Backend controller logic change karna padega email use karne ke liye
    forgotPassword({
      email: form.email,
      newPassword: form.newPassword,
    });
  };

  return (
    <AuthLayout
      title="🔑 Reset Access"
      subtitle="Enter your email to set a new password"
      gradient="bg-gradient-to-br from-blue-600 to-indigo-700"
    >
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password 🛡️</h2>

        <AuthInput 
          label="Email Address" 
          name="email" 
          type="email" 
          value={form.email} 
          onChange={handleChange} 
          placeholder="your@email.com"
        />
        
        <hr className="my-4 border-gray-100" />
        
        <AuthInput label="New Password" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} />
        <AuthInput label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}