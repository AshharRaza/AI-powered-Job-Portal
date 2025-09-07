export const Card = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-indigo-600">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      {buttonText && (
        <button
          onClick={onClick}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};