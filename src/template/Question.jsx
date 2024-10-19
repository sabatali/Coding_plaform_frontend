import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditorComponent from '../Services/EditorComponent';
import DotsLoader from '../Components/DotsLoader/DotsLoader';
import { local_url } from '../constent';
import { AuthContext } from '../Context/authContext';

const QuestionForm = () => {
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questionType: 'labQuestion',
    difficulty: 'easy',
    language: 'C++',
    solutionDescription: '',
    solutionCode: '',
    createdBy: '',
    videoLink: '',
    hint: '',
  });

  let userToken = localStorage.getItem("token");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${local_url}/api/v1/question`, 
        formData,
        { 
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );
      // console.log("🚀 ~ handleSubmit ~ response:", response);

      if (response.status === 200) {
        setLoading(false);
        toast.success(response.data.message);
        setFormData({
          title: '',
          description: '',
          questionType: 'labQuestion',
          difficulty: 'easy',
          language: 'C++',
          solutionDescription: '',
          solutionCode: '',
          createdBy: '',
          videoLink: '',
          hint: '',
        });
      }

    } catch (error) {
      setLoading(false);
      // console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="items-center min-h-screen bg-gray-100 p-4 w-full">
      {userData.role !== "contrifbutor" && (
        <div className="bg-yellow-400 text-gray-800 py-3 px-4 flex justify-between items-center top-0 left-0 right-0 z-50 shadow-md animate-slideDown">
        <div className="text-lg font-semibold text-red-700 flex items-center">
          🚧 
          <span className="ml-2">
            Your account does not have permission to add questions. 
            <span className="ml-1">Please visit your profile page and click on "Become Contributor".</span>
          </span>
        </div>
      </div>

      ) }
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Submit Your Question</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter your question title"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Provide a detailed description"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-lg font-medium text-gray-700">Question Type</label>
            <select
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="labQuestion">Lab Question</option>
              <option value="General">General</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-lg font-medium text-gray-700">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="JS">JavaScript</option>
              <option value="Python">Python</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-lg font-medium text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Solution Description</label>
          <textarea
            name="solutionDescription"
            value={formData.solutionDescription}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Describe the solution"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Solution Code</label>
          <textarea
            name="solutionCode"
            value={formData.solutionCode}
            onChange={handleChange}
            className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter the solution code"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Video Link</label>
            <input
              type="text"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter the video link"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Hint</label>
            <input
              type="text"
              name="hint"
              value={formData.hint}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Provide a hint if needed"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          {loading ? <DotsLoader /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
