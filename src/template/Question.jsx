import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditorComponent from '../Services/EditorComponent';
import DotsLoader from '../Components/DotsLoader/DotsLoader';
import { local_url } from '../constent';

const QuestionForm = () => {
  const [loading, setLoading] = useState(false)
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


  let userToken = localStorage.getItem("token")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post(`${local_url}/api/v1/question`, 
        formData,
        { 
          headers: { Authorization: `Bearer ${userToken}` }
        }
      )
      console.log("🚀 ~ handleSubmit ~ response:", response)

      if (response.status == "200") {
        setLoading(false)
        toast.success(response.data.message);
        setFormData({
          title: '',
          description: '',
          questionType: '',
          difficulty: '',
          language: '',
          solutionDescription: '',
          solutionCode: '',
          createdBy: '',
          videoLink: '',
          hint: '',
        })
      }

    } catch (error) {
      setLoading(false)
      console.log("🚀 ~ handleSubmit ~ error:", error)
      toast.error(error.response.data.message);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ToastContainer />
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Question Type</label>
          <select
            name="questionType"
            value={formData.questionType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="labQuestion">Lab Question</option>
            <option value="General">General</option>
            <option value="assignment">Assignment</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JS">JS</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Solution Description</label>
        <textarea
          name="solutionDescription"
          value={formData.solutionDescription}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Solution Code</label>
        <textarea
          name="solutionCode"
          value={formData.solutionCode}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Video Link</label>
        <input
          type="text"
          name="videoLink"
          value={formData.videoLink}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hint</label>
        <input
          type="text"
          name="hint"
          value={formData.hint}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {/* <div><EditorComponent /></div> */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {loading
          ? <DotsLoader />
          : "Submit"
        }

      </button>
    </form>

  );
};

export default QuestionForm;
