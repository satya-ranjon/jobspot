import BlogCard from "../../components/common/BlogCard";
import Container from "../../components/common/Container";
import blogs from "../../data/blogs.json";

const RecentNews = () => {
  return (
    <div className="py-20 md:py-24 lg:py-28">
      <h1 className=" mb-10 text-2xl md:text-3xl lg:text-5xl font-bold text-center">
        Recent News Articles
      </h1>
      <Container>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 xl:gap-10">
          {blogs.map((item) => (
            <BlogCard key={item.id} blog={item} />
          ))}
        </div>
      </Container>

      <div className="text-center  bg-[#e8f3f7] flex justify-center items-center flex-col py-16 mt-16 gap-5">
        <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-700">
          Subscribe Our Newsletter
        </h1>
        <h1 className=" text-xl text-zinc-500">
          Advertise your jobs to millions of monthly User and find your jobs
        </h1>
        <div className="p-1 md:p-3  overflow-hidden rounded-lg bg-white flex justify-between items-center">
          <input
            type=""
            placeholder=" Your e-mail"
            className="text-sm md:text-xl outline-none placeholder:text-zinc-400"
          />
          <button className=" text-md md:text-xl px-2 md:px-4 py-2 rounded-lg font-semibold text-white bg-green-500">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentNews;
3;
