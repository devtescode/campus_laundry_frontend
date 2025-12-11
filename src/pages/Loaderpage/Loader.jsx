// components/Loader.jsx
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-t-primary border-r-primary border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
