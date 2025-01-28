import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { live_url } from '../constent';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [bt, setBT] = useState({ income: 0, expense: 0, balance: 0 });
  const [lastMonthExpense, setLastMonthExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const transactionsRes = await axios.get(`${live_url}/api/v1/transactions/gettransactions`);
      setTransactions(transactionsRes.data.data);
  
      const balanceRes = await axios.get(`${live_url}/api/v1/transactions/balance`);
      setBT(balanceRes.data.data.details);
      setBalance(balanceRes.data.data);
  
      const lastMonthRes = await axios.get(`${live_url}/api/v1/transactions/last-month-expenses`);
      setLastMonthExpense(lastMonthRes.data.data.total);
  
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };
  const addTransaction = async (transaction) => {
    try {
      await axios.post(`${live_url}/api/v1/transactions/addtransactions`, transaction);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${live_url}/api/v1/transactions/deltransactions/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        bt,
        lastMonthExpense,
        loading,
        error,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);

// Card component for reusability
export const StatsCard = ({ icon: Icon, title, value, color }) => (
  <div className={`p-6 rounded-lg shadow-lg ${color} text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="mt-2">{title}</p>
      </div>
      <Icon className="w-12 h-12 opacity-75" />
    </div>
  </div>
);