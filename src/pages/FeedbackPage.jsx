import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/authContext';
import DotsLoader from '../Components/DotsLoader/DotsLoader';

const FeedbackPage = () => {
  const { userData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    feedback: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      console.log('Feedback submitted:', formData);

      const response = await fetch('https://platform-backend-6njk.onrender.com/api/v1/feedbacke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      const data = await response.json();
      console.log('Feedback submission response:', data);

      setFormData({
        fullName: '',
        email: '',
        feedback: '',
      });
      setLoading(false)
      setSubmitted(true);

    } catch (error) {
      setLoading(false)
      console.error('Error during feedback submission:', error);
      alert('Error submitting feedback. Please check your network and try again.');
    }
  };

  return (
    <div className=" bg-gray-100  py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        We Value Your Feedback!
      </h1>

      {submitted ? (
        <div className="text-center text-green-600 text-xl">
          Thank you for your feedback! 😊
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">
              Feedback
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="5"
              required
            />
          </div>
          {!loading ? (
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit Feedback
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <DotsLoader />
              </button>
            </div>
          )}

        </form>
      )}
    </div>
  );
};

export default FeedbackPage;
