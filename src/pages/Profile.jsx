import React, { useContext } from 'react';
import { AuthContext } from '../Context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { live_url, local_url } from '../constent';

const ProfilePage = () => {
    const { userData } = useContext(AuthContext);
    

    console.log("🚀 ~ ProfilePage ~ userData:", userData)

    const handleUpdateUser = async (id) => {
      try {
        const res = await axios.post(`${live_url}/api/v1/adminmail/${id}`);
  
        console.log("🚀 ~ handleDelete ~ res:", res)
        toast.success(res.data.message || "Request Sended");
      } catch (error) {
        console.error("Failed to send request:", error);
        toast.error( 
          error || "Failed to send request ");
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
      <ToastContainer />
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              className="h-32 w-32 rounded-full border-4 border-indigo-600 shadow-lg"
              src={`https://ui-avatars.com/api/?name=${userData.fullName}&background=4F46E5&color=fff&size=128`}
              alt="User Avatar"
            />
            {userData.isVerified && (
              <span className="absolute top-0 right-0 h-8 w-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 5.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">{userData.fullName}</h2>
            <p className="text-gray-500">@{userData.username}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Email:</p>
            <p className="text-indigo-600">{userData.email}</p>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Phone:</p>
            <p className="text-indigo-600">{userData.phone}</p>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Role:</p>
            <p className="text-indigo-600 capitalize">{userData.role}</p>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Points:</p>
            <p className="text-indigo-600">{userData.points}</p>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Joined:</p>
            <p className="text-indigo-600">{new Date(userData.createdAt).toDateString()}</p>
          </div>

          {!(userData.role == "contributor") &&
          <button onClick={() =>  handleUpdateUser(userData._id)} class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
          <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
          <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
          <span class="relative text-white">Become Contributor</span>
          </button>

          }


        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
