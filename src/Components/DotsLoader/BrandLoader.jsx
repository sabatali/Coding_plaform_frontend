import React, { useContext } from 'react';
import { AuthContext } from '../../Context/authContext';

const BrandLoader = () => {
    const { userData } = useContext(AuthContext);
  const brandName = `Wait  ${userData?.fullName}` || "Code P";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-2">
        {brandName?.split('').map((letter, index) => (
          <span
            key={index}
            className={`text-4xl font-bold text-blue-600 animate-bounce`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {`${letter}`}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BrandLoader;
