"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(form);

    // TODO: API call
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-blue-500 to-purple-500 text-white items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold mb-4">🚀 Join Finance Tracker App</h1>
          <p className="text-lg">
            Start managing your money smarter today.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2  flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account ✨
          </h2>

          {/* Name */}
          <div className="mb-1">
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border-2 border-purple-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-1">
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-2 border-purple-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-1">
            <label className="block mb-1 text-sm">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full border-2 border-purple-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-1">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border-2 border-purple-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="block mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full border-2 border-purple-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
             <Link href="/login" className="text-purple-500 font-medium">
              Login
            </Link>
            
          </p>
        </form>
      </div>
    </div>
  );
}