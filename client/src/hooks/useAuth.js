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

  
    const user = res.data.user;
    const token = res.data.accessToken;

    setToken(token);

   
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
      fullname: data.name, 
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

const forgotPassword = async (data) => {
    try {
      setLoading(true);

      // DHAYAN DO: Endpoint backend route se match hona chahiye
      // Agar backend me router.route("/forgot-password") hai, toh yahi likho
      await apiRequest("/auth/forgot-password", "POST", {
        email: data.email,       // Frontend state se 'email' bhej rahe hain
        newPassword: data.newPassword, // Frontend state se 'newPassword'
      });

      alert("Password updated successfully! Ab login karo. ✅");
      
      // Cleanup: Purana koi data ho toh hata do
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      router.push("/login");
    } catch (err) {
      // Agar 'err.message' HTML hai, toh console me check karo
      console.error("Auth Hook Error:", err);
      alert(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };
  return { login, signup, forgotPassword, loading };
 
}