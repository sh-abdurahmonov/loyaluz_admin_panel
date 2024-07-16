import { useState, useEffect } from "react";
import { Space, Table, Modal, Button } from "antd";
import axiosClient from "../../axios-client";
import { CiEdit, CiTrash } from "react-icons/ci";
const imageUrl = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      axiosClient.get("blogs").then((res) => setBlogs(res?.data?.data));
    };
    fetchData();
  }, [setBlogs]);
  console.log(blogs);
  //
  const data = blogs?.map((blog) => ({
    author: blog.author,
    title_uz: blog.title_uz,
    text_uz: blog.text_uz,
    image: blog.blog_images[0].image.src,
  }));
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //
  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Title",
      dataIndex: "title_uz",
      key: "title_uz",
    },
    {
      title: "Text",
      dataIndex: "text_uz",
      key: "text_uz",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (item, index) => (
        <img
          className="w-24 h-24 object-cover"
          src={`${imageUrl}${item}`}
          alt={index}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space className="text-2xl cursor-pointer">
          <Button className="border-none text-2xl">
            <CiEdit onClick={showModal} className="text-green-800" />
          </Button>
          <CiTrash className="text-red-900" />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      ;
    </>
  );
};
export default Blogs;
