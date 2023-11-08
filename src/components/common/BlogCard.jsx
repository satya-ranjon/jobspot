import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="w-full">
      <img
        src={blog?.img}
        className=" w-full h-56 xl:h-64 rounded-xl border-[1px] border-zinc-200"
        alt="Technology"
      />
      <h1 className=" text-md xl:text-lg mt-3 font-normal text-zinc-500">
        {blog?.createAt} / {blog?.comments} comments
      </h1>
      <h1 className=" text-lg xl:text-xl mt-1 font-semibold text-md  text-zinc-700">
        {blog?.title}
      </h1>
    </Link>
  );
};

export default BlogCard;
