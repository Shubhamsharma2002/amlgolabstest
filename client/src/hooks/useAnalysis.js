import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api'; 

const useAnalysis = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnalysis = async () => {
        try {
            setLoading(true);
            const data = await apiRequest("/dashboard/analyze", "GET");
            setSuggestions(data.suggestions || []);
        } catch (err) {
            console.error("AI Analysis Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAnalysis(); }, []);

    return { suggestions, loading, refresh: fetchAnalysis };
};

export default useAnalysis;