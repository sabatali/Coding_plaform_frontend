import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BetaBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const bannerStatus = localStorage.getItem('betaBannerClosed');
    if (bannerStatus === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('betaBannerClosed', 'true');
  };

  const handleFeedBacke = () => {
    navigate('/feedbacke');
  };


  if (!isVisible) return null;

  return (
    <div className="bg-yellow-400 text-gray-800 py-3 px-4 flex justify-between items-center top-0 left-0 right-0 z-50 shadow-md animate-slideDown">
      <div className="text-lg font-semibold text-red-700 flex items-center">
      🚧 
<span className="ml-2">
  This is a Beta Version. 🚧 
  <span className="ml-1">We’re actively working on improvements and appreciate your feedback!</span> 
  <span 
    className="ml-2 underline text-blue-700 hover:text-blue-500 cursor-pointer"
    onClick={handleFeedBacke}
  >
    Give Feedback
  </span>
  🚧
</span>
      </div>
      <button
        onClick={handleClose}
        className="text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md"
        aria-label="Close Beta Banner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default BetaBanner;
