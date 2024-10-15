
import React from 'react';
import './DotsLoader.css'; 

const DotsLoader = () => {
  return (
    <div className="flex justify-center items-center my-1.5 space-x-2">
      <div className="w-3 h-3 bg-white rounded-full dot"></div>
      <div className="w-3 h-3 bg-white rounded-full dot"></div>
      <div className="w-3 h-3 bg-white rounded-full dot"></div>
    </div>
  );
};

export default DotsLoader;