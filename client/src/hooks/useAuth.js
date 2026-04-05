"use client";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { setToken, setUser, getUser, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUserState] = useState(null); 
  const router = useRouter();

 
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUserState(savedUser);
    }
  }, []);

  // --- LOGIN ---
  const login = async (data) => {
    try {
      setLoading(true);
      const res = await apiRequest("/auth/login", "POST", data);

      const loggedInUser = res.data.user;
      const token = res.data.accessToken;

      // 1. Tokens aur User save karo
      setToken(token);
      
      const userToSave = {
        ...loggedInUser,
        name: loggedInUser.fullname,
        role: loggedInUser.role, 
      };

      setUser(userToSave);
      setUserState(userToSave); 
      alert("Login Successful! 🚀");
      router.push("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // --- SIGNUP ---
  const signup = async (data) => {
    try {
      setLoading(true);
      const payload = {
        fullname: data.name,
        email: data.email,
        password: data.password,
        role: data.role || "user", 
      };

      await apiRequest("/auth/register", "POST", payload);

      alert("Signup successful 🎉 Ab login karo.");
      router.push("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD ---
  const forgotPassword = async (data) => {
    try {
      setLoading(true);
      await apiRequest("/auth/forgot-password", "POST", {
        email: data.email,
        newPassword: data.newPassword,
      });

      alert("Password updated successfully! ✅");
      logout(); // Reset ke baad clean logout
    } catch (err) {
      console.error("Forgot Password Error:", err);
      alert(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // --- LOGOUT ---
  const logout = () => {
    removeToken();
    localStorage.removeItem("user");
    setUserState(null);
    router.push("/login");
  };

  return { 
    user,      
    login, 
    signup, 
    forgotPassword, 
    logout, 
    loading 
  };
}