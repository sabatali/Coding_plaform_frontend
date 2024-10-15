import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// Create the context
const TableContext = createContext();

// Create a provider component
const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  console.log("🚀 ~ TableProvider ~ tableData:", tableData)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/questions');
        setTableData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContext.Provider value={{ tableData, loading, error }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
