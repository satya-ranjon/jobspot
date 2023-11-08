const PageHeader = ({ title }) => {
  return (
    <div className="bg-[#e8f3f7] py-8 md:py-16 text-center text-zinc-700">
      <h1 className="text-2xl  md:text-4xl font-semibold uppercase">{title}</h1>
    </div>
  );
};

export default PageHeader;
