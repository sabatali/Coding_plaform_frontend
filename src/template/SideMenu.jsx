import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faCog, faSquare } from '@fortawesome/free-solid-svg-icons'; // Importing the necessary FontAwesome icons
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const headerHeight = '72px';

  return (
    <div
      className="flex lg:space-x-3 justify-center lg:justify-start lg:px-3 border-b border-gray-900 items-center"
      style={{ height: headerHeight }}
    >
      <img src="src/assets/logo.png" alt="" width={80}/>
      <h2 className="text-white text-2xl font-semibold hidden lg:inline">
        {props.title}
      </h2>
    </div>
  );
}

function MenuItem(props) {
  let activeClass =
    " text-gray-400 lg:rounded-md hover:text-white hover:bg-gray-700";

  if (props.active) {
    activeClass = " lg:rounded-md text-white bg-gray-900";
  }

  return (
    <Link
      to={props.to}
      replace
      className={"lg:mx-2 py-4 lg:py-2 lg:px-3 flex justify-center lg:justify-start space-x-4 items-center truncate " + activeClass}
    >
      {props.children}
      <span className="hidden lg:inline">{props.title}</span>
    </Link>
  );
}

function SideMenu(props) {
  const itemIconClass = "w-8 h-8 lg:w-5 lg:h-5";
  const location = useLocation();

  return (
    <div className="bg-gray-800 overflow-y-auto h-screen">
      <Header title="Code" />
      <ul className="lg:mt-2 lg:space-y-2">
        <MenuItem to="/dashboard" title="Dashboard" active={location.pathname === '/dashboard'}>
          <FontAwesomeIcon icon={faHome} className={itemIconClass} />
        </MenuItem>

        <MenuItem to="/questions-table" title="All Questions" active={location.pathname === '/questions-table'}>
          <FontAwesomeIcon icon={faCog} className={itemIconClass} />
        </MenuItem>
        
        <MenuItem to="/question" title="Add Question" active={location.pathname === '/question'}>
          <FontAwesomeIcon icon={faCog} className={itemIconClass} />
        </MenuItem>

        <MenuItem to="/chatwith_ai" title="Chat With AI" active={location.pathname === '/chatwith_ai'}>
          <FontAwesomeIcon icon={faCog} className={itemIconClass} />
        </MenuItem>

        <div>
          <span className="my-3 lg:my-5 border-b border-gray-900 block"></span>
        </div>

        <MenuItem to="/profile" title="Profile">
          <FontAwesomeIcon icon={faCog} className={itemIconClass} />
        </MenuItem>

        <MenuItem to="/register" title="Add User">
          <FontAwesomeIcon icon={faCog} className={itemIconClass} />
        </MenuItem>
      </ul>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

SideMenu.MenuItem = MenuItem;
SideMenu.Header = Header;

export default SideMenu;
