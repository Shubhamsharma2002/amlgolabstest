import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { setToken, setUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const login = async (data) => {
  try {
    setLoading(true);

    const res = await apiRequest("/auth/login", "POST", data);

    // 🔥 correct data path
    const user = res.data.user;
    const token = res.data.accessToken;

    setToken(token);

    // 🔥 normalize name
    setUser({
      ...user,
      name: user.fullname,
    });

    router.push("/dashboard");
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};
  

const signup = async (data) => {
  try {
    setLoading(true);

    const payload = {
      fullname: data.name, // 🔥 important mapping
      email: data.email,
      password: data.password,
    };

    await apiRequest("/auth/register ", "POST", payload);

    alert("Signup successful 🎉");
    router.push("/login");
  } catch (err) {
    alert(err.message);
    
  } finally {
    setLoading(false);
  }
};

  return { login, signup, loading };
}