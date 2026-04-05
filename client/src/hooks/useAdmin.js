
const fetchAdminStats = async () => {
    const res = await apiRequest("/auth/admin/dashboard", "GET");
    return res.data; // Isme users ka total spending hoga [cite: 44]
};