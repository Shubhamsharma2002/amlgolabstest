import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api'; 

const useAnalysis = (categoryStats) => { // Data as a parameter lo
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAnalysis = async () => {
        // AGAR DATA NAHI HAI, TOH CALL MAT KARO
        if (!categoryStats || categoryStats.length === 0) {
            console.log("Analysis skipped: No category stats yet.");
            return;
        }

        try {
            setLoading(true);
            // Yahan check karo ki tum Node backend (/analyze) ko hit kar rahe ho 
            // jo aage Python ko call karega
            const response = await apiRequest("/dashboard/analyze", "GET"); 
            
            setSuggestions(response.suggestions || []);
        } catch (err) {
            console.error("AI Analysis Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Sirf tab call karo jab dashboard stats load ho jayein
        if (categoryStats && categoryStats.length > 0) {
            fetchAnalysis();
        }
    }, [categoryStats]); // Dependency array mein categoryStats dalo

    return { suggestions, loading, refresh: fetchAnalysis };
};

export default useAnalysis;