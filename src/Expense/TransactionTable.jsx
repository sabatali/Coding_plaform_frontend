import { format } from "date-fns";
import { useState } from "react";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { useTransactions } from "./TransactionContext";

const TransactionTable = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date{" "}
              {sortConfig.key === "date" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Description
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              Amount{" "}
              {sortConfig.key === "amount" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Person
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedTransactions.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(transaction.date), "dd MMM yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {/* Icon based on transaction type */}
                  {transaction.type === "income" && (
                    <FiArrowUp className="text-green-500 mr-2" />
                  )}
                  {transaction.type === "expense" && (
                    <FiArrowDown className="text-red-500 mr-2" />
                  )}
                  {transaction.type === "taken" && (
                    <FiArrowUp className="text-orange-500 mr-2" />
                  )}
                  {transaction.type === "given" && (
                    <FiArrowDown className="text-yellow-500 mr-2" />
                  )}

                  {/* Amount display with dynamic color */}
                  <span
                    className={
                      transaction.type === "income"
                        ? "text-green-600"
                        : transaction.type === "expense"
                          ? "text-red-600"
                          : transaction.type === "taken"
                            ? "text-orange-500"
                            : "text-yellow-500"
                    }
                  >
                    ₹{transaction.amount.toFixed(2)}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction?.person}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deleteTransaction(transaction._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
