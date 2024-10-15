
import { useContext } from "react";
import { TableContext } from "../Context/TableContext";
import QuestionTable from "../tables/questionTable";
import QuickStackCard from "./QuickStackCard";
import {
  UserGroupIcon,
  ShoppingCartIcon,
  ColorSwatchIcon,
  CubeIcon,
} from "@heroicons/react/outline";

function Dashboard() {
  const { tableData } = useContext(TableContext);


  const loading = true;

  const iconClass = "w-10 h-10 text-gray-400";
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStackCard title="Total Questions" statics={tableData.length}>
          <CubeIcon className={iconClass} />
        </QuickStackCard>
        {!loading ? ( <>
          <QuickStackCard title="Today Questions" statics={"00"}>
          <UserGroupIcon className={iconClass} />
        </QuickStackCard>
        </> ) : ( <> <QuickStackCard title="Today Posts" statics={"00"}>
          <UserGroupIcon className={iconClass} />
        </QuickStackCard></>)}

        <QuickStackCard title="Total Fliles" statics={"00"}>
          <ColorSwatchIcon className={iconClass} />
        </QuickStackCard>
      
        <QuickStackCard title="Total User" statics="00">
          <ShoppingCartIcon className={iconClass} />
        </QuickStackCard>
      </div>
      <div className="">
        < QuestionTable/>
      </div>
    </div>
  );
}

export default Dashboard;
