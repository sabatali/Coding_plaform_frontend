import PropTypes from "prop-types";

function QuickStackCard(props) {
  return (
    <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex space-x-4 items-center">
        <div className="bg-white rounded-full p-3">
          {props.children}
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl font-semibold">
            {props.title}
          </h3>
          <span className="text-3xl font-bold">
            {props.statics}
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <a
          href=""
          className="text-sm font-medium text-white border-b border-white hover:text-yellow-300 transition-all duration-200"
        >
          View all
        </a>
      </div>
    </div>
  );
}

QuickStackCard.propTypes = {
  title: PropTypes.string.isRequired,
  statics: PropTypes.string.isRequired,
};

export default QuickStackCard;

