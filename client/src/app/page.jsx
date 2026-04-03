import { redirect } from "next/navigation";

export default function Home() {
  const isLoggedIn = true; // baad me auth se replace karega

  if (isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}