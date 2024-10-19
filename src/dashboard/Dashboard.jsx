import { useContext } from "react";
import { TableContext } from "../Context/TableContext";
import QuestionTable from "../tables/questionTable";
import QuickStackCard from "./QuickStackCard";
import {
  DocumentTextIcon,
  FolderIcon,
  UsersIcon,
} from "@heroicons/react/outline";

function Dashboard() {
  const { tableData } = useContext(TableContext);
  
  const loading = false; // For testing, we assume loading is false now

  // Get today's date in 'YYYY-MM-DD' format
  const today = new Date().toISOString().split("T")[0];

  // Filter the questions created today by comparing 'createdAt' with today's date
  const todayQuestions = tableData.filter((question) => {
    const questionDate = question.createdAt.split("T")[0]; // Get 'YYYY-MM-DD' part
    return questionDate === today;
  });

  const iconClass = "w-10 h-10 text-gray-400";

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Questions */}
        <QuickStackCard title="Total Questions" statics={tableData.length}>
          <DocumentTextIcon className={iconClass} />
        </QuickStackCard>

        <QuickStackCard title="Today Questions" statics={todayQuestions.length}>
          <DocumentTextIcon className={iconClass} />
        </QuickStackCard>

        <QuickStackCard title="Total Files" statics={"00"}>
          <FolderIcon className={iconClass} />
        </QuickStackCard>

        <QuickStackCard title="Total Users" statics="00">
          <UsersIcon className={iconClass} />
        </QuickStackCard>
      </div>

      <div className="">
        <QuestionTable />
      </div>
    </div>
  );
}

export default Dashboard;
