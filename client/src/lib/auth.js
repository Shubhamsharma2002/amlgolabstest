//  TOKEN
export const setToken = (token) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const removeToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
};

//  USER
export const setUser = (user) => {
  if (typeof window === "undefined") return;

  if (!user) return; 

  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");

  //  safety checks
  if (!user || user === "undefined" || user === "null") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (err) {
    console.error("Invalid user JSON", err);
    return null;
  }
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};