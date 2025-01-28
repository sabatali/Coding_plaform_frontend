import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { useTransactions } from "./TransactionContext";

const AddTransactionForm = () => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date(),
  });
  const categories = {
    income: ["Salary", "Gift", "FH", "Upwork", "Other"],
    expense: ["Food", "Transport", "Rent", "Other"],
    given: ["Loan", "Gift", "Rent", "Food", "Other"],
    taken: ["Loan", "Gift", "Rent", "Food", "Other"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    setFormData({
      description: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "income" })}
              className={`flex-1 flex items-center justify-center p-3 rounded-lg ${
                formData.type === "income"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <FiArrowUp className="mr-2" />
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "expense" })}
              className={`flex-1 flex items-center justify-center p-3 rounded-lg ${
                formData.type === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <FiArrowDown className="mr-2" />
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "given" })}
              className={`flex-1 flex items-center justify-center p-3 rounded-lg ${
                formData.type === "given"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <FiArrowDown className="mr-2" />
              Given (dena)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "taken" })}
              className={`flex-1 flex items-center justify-center p-3 rounded-lg ${
                formData.type === "taken"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <FiArrowUp className="mr-2" />
              Taken (lena)
            </button>
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories[formData.type].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Amount (₹)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Person Input for given/taken */}
        {["given", "taken"].includes(formData.type) && (
          <div>
            <label className="block mb-1">Person Name</label>
            <select
              value={formData.person || ""}
              onChange={(e) =>
                setFormData({ ...formData, person: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a person
              </option>{" "}
              {/* Placeholder */}
              <option value="Ahmed">Ahmed</option>
              <option value="Rizwan">Rizwan</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Date Picker */}
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;
