import PageHeader from "../../components/common/PageHeader";
import BlogCard from "../../components/common/BlogCard";
import Container from "../../components/common/Container";
import blogs from "../../data/blogs.json";
import { useParams } from "react-router-dom";
import { RiMessage2Line } from "react-icons/ri";
import { BsCalendar2Date } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import useTitleSet from "../../hooks/useTitleSet";

const Blog = () => {
  const { id } = useParams();
  useTitleSet("Blog");
  const activeBlog = blogs.find((i) => i.id === id);
  return (
    <div>
      <PageHeader title="Blog" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 my-16 gap-10">
          <div className=" lg:col-span-3">
            <img
              src={activeBlog.img}
              alt="img"
              className="h-[300px] md:h-[400px] lg:h-[500px] w-full"
            />
            <h1 className=" text-3xl font-semibold text-zinc-700 mt-10">
              {activeBlog.title}
            </h1>
            <div className=" flex justify-start items-center gap-3 mt-3 text-lg text-zinc-500">
              <div className="flex justify-start items-center gap-2">
                <BsCalendar2Date />{" "}
                <span className=" text-sm">{activeBlog?.createAt}</span>
              </div>
              <div className="flex justify-start items-center gap-2">
                <RiMessage2Line />
                <span className=" text-sm">
                  {activeBlog?.comments} Comments
                </span>
              </div>
              <div className="flex justify-start items-center gap-2">
                <AiOutlineUser />
                <span className=" text-sm">
                  {activeBlog?.comments} Comments
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              {activeBlog?.description?.map((item) => (
                <div key={item.id}>
                  <h1 className=" text-2xl font-semibold text-zinc-700">
                    {item.label} :
                  </h1>
                  <div className=" pl-5 text-zinc-600">{item?.doc}</div>
                  <div className=" pl-5 text-zinc-600">
                    {item?.options?.map((item, i) => (
                      <div
                        key={i}
                        className=" flex justify-start items-center gap-2">
                        <GoDotFill /> <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" lg:col-span-1 flex flex-col items-start justify-start w-full gap-5">
            {blogs.map((item) => (
              <BlogCard key={item.id} blog={item} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
