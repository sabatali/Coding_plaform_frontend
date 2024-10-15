import React, { useContext, useState } from 'react';
import { TableContext } from '../Context/TableContext';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/outline';
import { FcClearFilters } from 'react-icons/fc';
import { TbFilterSearch } from 'react-icons/tb';

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
  const uniquedifficulty = [...new Set(tableData.map((item) => item.difficulty))];
  const uniquequestionType = [...new Set(tableData.map((item) => item.questionType))];


  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filteredData = tableData?.filter((item) =>
    item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedLanguage === "" || item.language === selectedLanguage) &&
    (selectedUser === "" || item.createdByUser === selectedUser) &&
    (selectedDifficulty === "" || item.difficulty === selectedDifficulty)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-xl px-2 py-3">
      <div className='flex justify-between overflow-x-auto'>
        <h2 className="text-2xl font-bold mb-4">Questions</h2>

        {/* Search Bar */}
       <div className='flex gap-6'>
       <div className="relative flex items-center w-full h-10 rounded-lg border focus-within:shadow-lg bg-white overflow-hidden mb-4">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <SearchIcon className="w-5" />
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by title..."
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={toggleFilter}
          className={`flex items-center ${isFilterOpen ? 'bg-green-400' : 'bg-green-600'} text-white rounded-md gap-2 h-10 px-4 py-2 mb-4`}
        >
          {isFilterOpen ? <FcClearFilters /> : <TbFilterSearch />}
          <span>Filters</span>
        </button>
       </div>
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="flex gap-8 mb-4">
          <div className="flex flex-col">
            <select
              id="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Languages</option>
              {/* Assuming uniqueLanguages is an array of available languages */}
              {uniqueLanguages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <select
              id="user"
              value={selectedUser}
              onChange={handleUserChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Users</option>
              {/* Assuming uniqueUsers is an array of available users */}
              {uniqueUsers.map((user, index) => (
                <option key={index} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Difficulties</option>
              {uniquedifficulty.map((user, index) => (
                <option key={index} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <select
              id="questiontype"
              value={selectedquestionType}
              onChange={handleQuestionType}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Question Types</option>
              {uniquequestionType.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      )}
  

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white rounded-lg shadow-xl">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300 text-black rounded-t-lg">
            <tr>
              <th className="w-1/6 py-4 px-6 uppercase font-bold text-sm text-left">Title</th>
              <th className="w-1/6 py-4 px-6 uppercase font-bold text-sm text-left">Question Type</th>
              <th className="w-1/6 py-4 px-6 uppercase font-bold text-sm text-left">Language</th>
              <th className="w-1/6 py-4 px-6 uppercase font-bold text-sm text-left">Difficulty</th>
              <th className="w-1/6 py-4 px-6 uppercase font-bold text-sm text-left">Created By</th>
              <th className="w-1/6 py-4 px-6 uppercase font-bold text-sm text-left">Created At</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {filteredData.map((row, index) => (
              <tr
                key={index}
                onClick={() => handleButtonClick(row._id)}
                className={`hover:bg-gray-200 transition-colors duration-200 cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b`}
              >
                <td className="w-1/6 py-4 px-6 text-left font-medium">{row.title}</td>
                <td className="w-1/6 py-4 px-6 text-left font-medium">{row.questionType}</td>
                <td className="w-1/6 py-4 px-6 text-left font-medium">{row.language}</td>
                <td className="w-1/6 py-4 px-6 text-left font-medium">{row.difficulty}</td>
                <td className="w-1/6 py-4 px-6 text-left font-medium">{row.createdByUser}</td>
                <td className="w-1/6 py-4 px-6 text-left font-medium">{new Date(row.createdAt).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionTable;
