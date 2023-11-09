const CheckBoxInput = ({ label, ...argument }) => {
  return (
    <div className="flex items-center">
      <input
        {...argument}
        id={label}
        type="checkbox"
        name={label}
        value=""
        className="w-4 h-4 cursor-pointer text-green-600 bg-gray-100 border-gray-300 rounded 
         "
      />
      <label
        htmlFor={label}
        className={`ml-2 text-sm font-medium cursor-pointer`}>
        {label}
      </label>
    </div>
  );
};

export default CheckBoxInput;
