const BASE_URL = "http://localhost:5000/api/v1";

export const apiRequest = async (endpoint, method, body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  // 🔥 YAHAN FIX HAI: Pehle JSON extract karo
  const data = await res.json(); 

  if (!res.ok) {
    // Ab 'data' defined hai, toh ye error nahi dega
    throw new Error(data.message || "Something went wrong");
  }

  // Seedha data return karo kyunki humne upar extract kar liya hai
  return data; 
};
export const logoutApi = async () => {
  try {
    await apiRequest("/auth/logout", "POST");
  } catch (err) {
    console.log("Logout API failed (ignore)", err);
  }
};