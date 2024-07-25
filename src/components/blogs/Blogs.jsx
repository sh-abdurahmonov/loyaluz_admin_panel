import { useState, useEffect } from "react";
import {
  Space,
  Table,
  Modal,
  Button,
  Form,
  Input,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

const Blogs = () => {
  const imageUrl = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/";
  const [blogs, setBlogs] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // New state variable for adding a blog
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axiosClient.get("blogs").then((res) => setBlogs(res?.data?.data));
    };
    fetchData();
  }, [setBlogs]);

  const [form] = Form.useForm();

  const showModal = (blog) => {
    setSelectedBlog(blog);
    form.setFieldsValue(blog);
    setIsModalOpen(true);
    setIsAdding(false); // Not adding a new blog
  };

  const showAddModal = () => {
    form.resetFields();
    setSelectedBlog(null);
    setIsModalOpen(true);
    setIsAdding(true); // Adding a new blog
  };

  const handleImageChange = (info) => {
    if (info.fileList.length > 0) {
      setImageFile(info.fileList[0].originFileObj);
    } else {
      setImageFile(null);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axiosClient.post("blogs/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      toast.error("Failed to upload image.");
      throw error;
    }
  };

  const handleOk = async () => {
    try {
      const blogData = await form.validateFields();
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        blogData.image = imageUrl;
      }

      if (isAdding) {
        axiosClient.post("blogs", blogData);
        setBlogs((prevBlogs) => [...prevBlogs, response.data]);
        toast.success("Blog added successfully!");
      } else {
        await axiosClient.put(`blogs/${selectedBlog.id}`, blogData);
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === selectedBlog.id ? { ...blog, ...blogData } : blog
          )
        );
        toast.success("Blog updated successfully!");
      }

      setIsModalOpen(false);
    } catch (error) {
      toast.error(isAdding ? "Failed to add blog." : "Failed to update blog.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

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
          src={`${imageUrl}${index?.blog_images[0]?.image?.src}`}
          alt={index}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space className="text-2xl cursor-pointer">
          <Button onClick={() => showModal(record)} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end my-4 mx-4">
        <Button className="w-20 h-10" type="primary" onClick={showAddModal}>
          Add
          <span
            role="img"
            aria-label="plus-circle"
            class="anticon anticon-plus-circle"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="plus-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            </svg>
          </span>
        </Button>
      </div>
      <Table columns={columns} dataSource={blogs} rowKey="id" />
      <Modal
        title={isAdding ? "Add Blog" : "Edit Blog"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please input the author!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title_uz"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Text"
            name="text_uz"
            rules={[{ required: true, message: "Please input the text!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Blogs;
