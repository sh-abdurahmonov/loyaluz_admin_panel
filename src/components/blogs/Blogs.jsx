import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      axiosClient.get("blogs").then((res) => setBlogs(res?.data?.data));
    };
    fetchData();
  }, [setBlogs]);
  return (
    <div>
      {blogs?.map((blog) => {
        return <h1>{blog.author}</h1>;
      })}
    </div>
  );
};

export default Blogs;
