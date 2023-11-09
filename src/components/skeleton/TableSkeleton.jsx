const TableSkeleton = () => {
  return (
    <tr className=" animate-pulse">
      <td className="px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
        <div className="h-4 w-36  bg-[#e8f3f7] "></div>
      </td>
      <td className="px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
        <div className="h-4 w-36  bg-[#e8f3f7] "></div>
      </td>
      <td className="px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
        <div className="h-4 w-36  bg-[#e8f3f7] "></div>
      </td>
      <td className="px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
        <div className="h-4 w-36  bg-[#e8f3f7] "></div>
      </td>
    </tr>
  );
};

export default TableSkeleton;
