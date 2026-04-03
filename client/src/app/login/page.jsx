"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // TODO: API call
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-purple-500 to-blue-500 text-white items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold mb-4">💰 Finance Tracker App</h1>
          <p className="text-lg">
            Track your expenses smartly and stay within budget.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome Back 👋
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm ">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Forgot */}
          <div className="text-right mb-4">
            <span className="text-sm text-blue-500 cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Login
          </button>

          {/* Signup */}
          <p className="text-center text-sm mt-4">
            New user?{" "}
            <Link href="/signup" className="text-blue-500 font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
