import React, { useContext, useState } from "react";
import { TableContext } from "../Context/TableContext";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import { FcClearFilters } from "react-icons/fc";
import { TbFilterSearch } from "react-icons/tb";

const QuestionTable = () => {
  const { tableData, loading, error } = useContext(TableContext);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-xl p-4 bg-white dark:bg-gray-800 transition-colors">
      {/* Header Section */}
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
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Title
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Question Type
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Language
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Difficulty
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Created By
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {filteredData.map((row, index) => (
              <tr
                key={index}
                onClick={() => handleButtonClick(row._id)}
                className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-150 ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-900"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <td className="py-4 px-6 text-sm">{`${index + 1} `} {row.title}</td>
                <td className="py-4 px-6 text-sm">{row.questionType}</td>
                <td className="py-4 px-6 text-sm">{row.language}</td>
                <td className="py-4 px-6 text-sm">{row.difficulty}</td>
                <td className="py-4 px-6 text-sm">{row.createdByUser}</td>
                <td className="py-4 px-6 text-sm">
                  {new Date(row.createdAt).toLocaleDateString()}
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
