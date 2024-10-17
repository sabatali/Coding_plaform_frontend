import { useContext } from "react";
import { TableContext } from "../Context/TableContext";
import QuestionTable from "../tables/questionTable";
import QuickStackCard from "./QuickStackCard";
import {
  UserGroupIcon,
  DocumentTextIcon,
  FolderIcon,
  UsersIcon,
} from "@heroicons/react/outline"; // Updated Icons

function Dashboard() {
  const { tableData } = useContext(TableContext);
  const loading = false; // For testing, we assume loading is false now

  const iconClass = "w-10 h-10 text-gray-400";

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Questions */}
        <QuickStackCard title="Total Questions" statics={tableData.length}>
          <DocumentTextIcon className={iconClass} />
        </QuickStackCard>

        {/* Today Questions or Today Posts */}
        {!loading ? (
          <>
            <QuickStackCard title="Today Questions" statics={"00"}>
              <DocumentTextIcon className={iconClass} />
            </QuickStackCard>
          </>
        ) : (
          <>
            <QuickStackCard title="Today Posts" statics={"00"}>
              <DocumentTextIcon className={iconClass} />
            </QuickStackCard>
          </>
        )}

        {/* Total Files */}
        <QuickStackCard title="Total Files" statics={"00"}>
          <FolderIcon className={iconClass} />
        </QuickStackCard>

        {/* Total Users */}
        <QuickStackCard title="Total Users" statics="00">
          <UsersIcon className={iconClass} />
        </QuickStackCard>
      </div>

      {/* Question Table */}
      <div className="">
        <QuestionTable />
      </div>
    </div>
  );
}

export default Dashboard;
