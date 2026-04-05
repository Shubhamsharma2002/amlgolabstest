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

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return res.json();
};
export const logoutApi = async () => {
  try {
    await apiRequest("/auth/logout", "POST");
  } catch (err) {
    console.log("Logout API failed (ignore)", err);
  }
};