const InputField = ({
  label,
  type = "text",
  textarea = false,
  ...argument
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-md font-semibold leading-6 text-zinc-950 uppercase">
        {label}
      </label>
      <div className="mt-2">
        {!textarea && (
          <input
            {...argument}
            placeholder={label}
            id={label}
            type={type}
            className={` appearance-none block w-full  text-zinc-700 border border-zinc-300 placeholder:text-zinc-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500`}
          />
        )}
        {textarea && (
          <textarea
            {...argument}
            placeholder={label}
            id={label}
            type={type}
            className={`  h-28 appearance-none block w-full  text-zinc-700 border border-zinc-300 placeholder:text-zinc-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500`}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
