import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileAlt,
  faCog,
  faSquare,
  faRobot,
  faFileLines,
  faFileCirclePlus,
  faPenToSquare,
  faUser,
  faComments,
  faCode
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const headerHeight = "72px";

  return (
    <div
      className="flex lg:space-x-3 justify-center lg:justify-start lg:px-3 border-b border-gray-900 items-center bg-gray-800 shadow-md"
      style={{ height: headerHeight }}
    >
     <img src="../../public/code-p.png" alt="Code P" />

{/*      <h2 className="text-white text-2xl font-semibold hidden px-4 lg:inline">
        {props.title}
      </h2> */}
    </div>
  );
}

function MenuItem(props) {
  let activeClass =
    "text-gray-400 lg:rounded-md hover:text-white hover:bg-gray-700 transition duration-200";

  if (props.active) {
    activeClass = "lg:rounded-md text-white bg-gray-900";
  }

  return (
    <Link
      to={props.to}
      replace
      className={`lg:mx-2 py-4 lg:py-2 lg:px-3 flex justify-center lg:justify-start space-x-4 items-center truncate  ${activeClass}`}
    >
      {props.children}
      <span className="hidden lg:inline">{props.title}</span>
    </Link>
  );
}

function SideMenu(props) {
  const itemIconClass =
    "w-8 h-8 lg:w-5 lg:h-5 text-gray-400 transition duration-200 hover:text-white";
  const location = useLocation();

  return (
    <div className="bg-gray-800 overflow-y-auto h-screen shadow-lg">
      <Header title="Code P" />
      <ul className="lg:mt-2 lg:space-y-2">
        <MenuItem
          to="/dashboard"
          title="Dashboard"
          active={location.pathname === "/dashboard"}
        >
          <FontAwesomeIcon icon={faHome} className={itemIconClass} />
        </MenuItem>

        <MenuItem
          to="/chatwith_ai"
          title="Chat With AI"
          active={location.pathname === "/chatwith_ai"}
        >
          <FontAwesomeIcon icon={faRobot} className={itemIconClass} />
        </MenuItem>

        <MenuItem
          to="/java-compiler"
          title="Java Compiler"
          active={location.pathname === "/java-compiler"}
        >
<FontAwesomeIcon icon={faCode} />        </MenuItem>

        <MenuItem
          to="/sgpa"
          title="SGPA Calculator"
          active={location.pathname === "/sgpa"}
        >
          <FontAwesomeIcon icon={faPenToSquare} className={itemIconClass} />
        </MenuItem>

        <MenuItem
          to="/assignmentprompt"
          title="Assignment Writer"
          active={location.pathname === "/assignmentprompt"}
        >
          <FontAwesomeIcon icon={faPenToSquare} className={itemIconClass} />
        </MenuItem>

        <MenuItem
          to="/questions-table"
          title="All Questions"
          active={location.pathname === "/questions-table"}
        >
          <FontAwesomeIcon icon={faFileAlt} className={itemIconClass} />
        </MenuItem>

        <MenuItem
          to="/file-table"
          title="All Documents"
          active={location.pathname === "/file-table"}
        >
          <FontAwesomeIcon icon={faFileLines} className={itemIconClass} />
        </MenuItem>

        <div>
          <span className="my-3 lg:my-5 border-b border-gray-900 block"></span>
        </div>

        <MenuItem
          to="/question"
          title="Add Question"
          active={location.pathname === "/question"}
        >
          <FontAwesomeIcon icon={faSquare} className={itemIconClass} />
        </MenuItem>

        <MenuItem
          to="/add-files"
          title="Add Documents"
          active={location.pathname === "/add-files"}
        >
          <FontAwesomeIcon icon={faFileCirclePlus} className={itemIconClass} />
        </MenuItem>

        <div>
          <span className="my-3 lg:my-5 border-b border-gray-900 block"></span>
        </div>

        <MenuItem
          to="/profile"
          title="Profile"
          active={location.pathname === "/profile"}
        >
          <FontAwesomeIcon icon={faUser} className={itemIconClass} />
        </MenuItem>

        <MenuItem
          to="/feedbacke"
          title="Give Feedback"
          active={location.pathname === "/feedbacke"}
        >
          <FontAwesomeIcon icon={faComments}  className={itemIconClass} />
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
