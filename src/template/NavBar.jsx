import UserAvatar from "./profile.png";
import {
  SearchIcon,
  LogoutIcon,
  UserIcon,
  AdjustmentsIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { AuthContext } from "../Context/authContext";

function NavBar() {
  const [profileImage, setProfileImage] = useState(null);
  const [greeting, setGreeting] = useState('');
  // console.log("🚀 ~ NavBar ~ userData:", userData)
  const navBarHeight = 71;
  const { userData, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const updateGreeting = () => {
    const now = new Date();
    const currentHour = parseInt(format(now, 'H'), 10); // Ensure it's an integer

    let greeting;
    if (currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    setGreeting(greeting); // Update the greeting state
};


  useEffect(() => {
    updateGreeting()
    // Load profile image from localStorage on component mount
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleLogout = () => {
      logout()
      navigate('/login'); 
};
  const handleProfile = () => {
    navigate('/profile');
  };


  return (
    <nav
      className="flex items-center space-x-4 shadow bg-white block w-full px-5 absolute"
      style={{ height: navBarHeight }}
    >
      <div className="hidden md:inline-flex flex-1">
      <h2 class="text-3xl font-bold text-center mb-4">
          {greeting} <span class="text-blue-500">{userData.fullName}</span>
        </h2>
      </div>

      <div className="flex-1 md:flex-none"></div>

      <a href="!#" className="relative text-gray-500 hover:text-gray-800">
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
        {/* <span class="absolute top-0 right-0 flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span> */}
        <BellIcon className="w-6 h-6" />
      </a>

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full items-center text-gray-500 hover:text-gray-800 focus:outline-none">
            <img
              className="rounded-full w-8 h-8 border-indigo-600 shadow-lg"
              src={`https://ui-avatars.com/api/?name=${userData.fullName}&background=4F46E5&color=fff&size=128`}
              alt="User Avatar"
            />
            <span className="font-medium ml-3 mr-1">{userData.username}</span>
            <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={handleProfile}
                    className={`${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <UserIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <AdjustmentsIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    Setting
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item >
                {({ active }) => (
                  <button
                  onClick={handleLogout}
                    className={`${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
}

export default NavBar;
