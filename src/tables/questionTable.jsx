import React, { useContext, useState } from "react";
import { TableContext } from "../Context/TableContext";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import { FcClearFilters } from "react-icons/fc";
import { TbFilterSearch } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai"; 
import axios from "axios";
import { local_url } from "../constent";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../Context/authContext";


const QuestionTable = () => {
  const { userData } = useContext(AuthContext);
  const { tableData, loading, error, setTableData } = useContext(TableContext); // Assume `setTableData` is available in context for updating table
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedquestionType, setSelectedquestionType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/questions/${id}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleQuestionType = (event) => {
    setSelectedquestionType(event.target.value);
  };

  const uniqueLanguages = [...new Set(tableData.map((item) => item.language))];
  const uniqueUsers = [...new Set(tableData.map((item) => item.createdByUser))];
  const uniquedifficulty = [
    ...new Set(tableData.map((item) => item.difficulty)),
  ];
  const uniquequestionType = [
    ...new Set(tableData.map((item) => item.questionType)),
  ];

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filteredData = tableData?.filter(
    (item) =>
      item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedLanguage === "" || item.language === selectedLanguage) &&
      (selectedUser === "" || item.createdByUser === selectedUser) &&
      (selectedDifficulty === "" || item.difficulty === selectedDifficulty)
  );

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${local_url}/api/v1/question/${id}`, {userData});

      // console.log("🚀 ~ handleDelete ~ res:", res)
      window.location.reload();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting question:", error.response);
      toast.error( 
        error.response.data.message || "Failed to delete question");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-xl p-4 bg-white dark:bg-gray-800 transition-colors">
      {/* Header Section */}
      <ToastContainer/>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Questions
        </h2>

        {/* Search and Filter Bar */}
        <div className="flex gap-4">
          {/* Search Bar */}
          <div className="relative flex items-center w-80 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm">
            <div className="grid place-items-center h-full w-12 text-gray-400 dark:text-gray-300">
              <SearchIcon className="w-5 h-5" />
            </div>
            <input
              className="peer h-full w-full pl-12 pr-4 bg-transparent text-sm text-gray-700 dark:text-gray-100 outline-none"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by title..."
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={toggleFilter}
            className={`flex items-center gap-2 h-10 px-4 py-2 text-sm font-medium text-white rounded-md ${
              isFilterOpen ? "bg-green-400" : "bg-green-600"
            } transition-all`}
          >
            {isFilterOpen ? <FcClearFilters /> : <TbFilterSearch />}
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex flex-col w-1/5">
            <label
              htmlFor="language"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Language
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 shadow-md transition duration-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Languages</option>
              {uniqueLanguages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-1/5">
            <label
              htmlFor="user"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              User
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={handleUserChange}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 shadow-md transition duration-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Users</option>
              {uniqueUsers.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-1/5">
            <label
              htmlFor="difficulty"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 shadow-md transition duration-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Difficulties</option>
              {uniquedifficulty.map((difficulty, index) => (
                <option key={index} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-1/5">
            <label
              htmlFor="questiontype"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Question Type
            </label>
            <select
              id="questiontype"
              value={selectedquestionType}
              onChange={handleQuestionType}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 shadow-md transition duration-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Question Types</option>
              {uniquequestionType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-sm">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Language</th>
              <th className="p-3 text-left">Difficulty</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item) => (
              <tr key={item._id} className="border-t border-gray-200 dark:border-gray-600">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.language}</td>
                <td className="p-3">{item.difficulty}</td>
                <td className="p-3">{item.createdByUser}</td>
                <td className="p-3 flex justify-center gap-4">
                  <button
                    onClick={() => handleButtonClick(item._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionTable;
