import {
  FaCalendarMinus,
  FaHandHoldingHeart,
  FaHandHoldingUsd,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaPiggyBank,
  FaWallet
} from "react-icons/fa";
import AddTransactionForm from "./AddTransactionForm";
import { StatsCard, useTransactions } from "./TransactionContext";
import TransactionTable from "./TransactionTable";

const TransactionPage = () => {
  const { bt, balance, lastMonthExpense, loading, error } = useTransactions();
  console.log("🚀 ~ TransactionPage ~ balance:", balance);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Finance Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <StatsCard
    icon={FaMoneyBillWave}
    title="Total Income"
    value={`₹${bt?.income?.toFixed(2)}`}
    color="bg-gradient-to-r from-green-500 to-green-700"
  />
  <StatsCard
    icon={FaMoneyCheckAlt}
    title="Total Expense"
    value={`₹${bt?.expense?.toFixed(2)}`}
    color="bg-gradient-to-r from-red-500 to-red-700"
  />
  <StatsCard
    icon={FaWallet}
    title="Current Balance"
    value={`₹${balance?.balance?.toFixed(2)}`}
    color="bg-gradient-to-r from-blue-500 to-blue-700"
  />
  <StatsCard
    icon={FaHandHoldingUsd}
    title="Total Cash"
    value={`₹${balance?.cash?.toFixed(2)}`}
    color="bg-gradient-to-r from-green-500 to-green-700"
  />
  <StatsCard
    icon={FaCalendarMinus}
    title="Last Month Expense"
    value={`₹${lastMonthExpense?.toFixed(2)}`}
    color="bg-gradient-to-r from-purple-500 to-purple-700"
  />
  <StatsCard
    icon={FaHandHoldingHeart}
    title="Total Given"
    value={`₹${bt?.given?.toFixed(2)}`}
    color="bg-gradient-to-r from-yellow-500 to-yellow-700" // Yellow for lending money
  />
  <StatsCard
    icon={FaPiggyBank}
    title="Total Taken"
    value={`₹${bt?.taken?.toFixed(2)}`}
    color="bg-gradient-to-r from-orange-500 to-orange-700" // Orange for borrowed money
  />
</div>



        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <AddTransactionForm />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
