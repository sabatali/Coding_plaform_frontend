import { createContext, useState } from 'react';
import axios from 'axios';
import { local_url } from '../constent';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const fetchAIResponse = async (prompt) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${local_url}/api/v1/aiapi`, { prompt });
            setResult(response.data);
        } catch (error) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AIContext.Provider value={{ loading, result, error, fetchAIResponse }}>
            {children}
        </AIContext.Provider>
    );
};

export default AIContext;
