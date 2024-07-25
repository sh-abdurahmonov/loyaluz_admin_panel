import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/site-logo.svg";
import { BiPlus, BiSolidCategory } from "react-icons/bi";
import { FaFileCircleQuestion, FaRegNewspaper } from "react-icons/fa6";
import { MdHomeRepairService } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { GrResources } from "react-icons/gr";
import { RiMenuFold3Fill, RiMenuFold4Fill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { Button } from "antd";
const Dashboard = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("ACCESS_TOKEN");
  const [collapsed, setCollapsed] = useState(false);

  if (!token) {
    return Navigate("/login");
  }
  const logoutFunc = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
  };
  return (
    <section className="flex h-screen w-screen bg-slate-100">
      {!collapsed && (
        <aside className="bg-white shadow-sm inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 flex flex-col justify-center items-center">
          <div className="fixed top-0 pt-2 w-full text-center px-4">
            <NavLink to="/">
              <img
                src={Logo}
                alt="loyal.uz's logo"
                className="w-36 ml-5 mb-10"
              />
            </NavLink>
            <div className="flex flex-col justify-center items-center gap-y-1 text-slate-500">
              <NavLink
                to="/categories"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <BiSolidCategory className="text-lg" />
                <p class="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
                  Categories
                </p>
              </NavLink>
              <NavLink
                to="/faqs"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <FaFileCircleQuestion className="text-lg" />
                <p class="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
                  FAQs
                </p>
              </NavLink>
              <NavLink
                to="/news"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <FaRegNewspaper className="text-lg" />
                <p class="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
                  News
                </p>
              </NavLink>
              <NavLink
                to="/blogs"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <TbLogs className="text-lg" />
                <p class="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
                  Blogs
                </p>
              </NavLink>
              <NavLink
                to="/services"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <MdHomeRepairService className="text-lg" />
                <p class="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
                  Services
                </p>
              </NavLink>
              <NavLink
                to="/sources"
                className="font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg bg-gradient-to-tr  hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-4 px-4 capitalize w-full"
              >
                <GrResources className="text-lg" />
                <p class="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
                  Sources
                </p>
              </NavLink>
            </div>
          </div>
        </aside>
      )}
      <div className="flex w-full flex-col">
        <header className="bg-white shadow-sm translate-x-0 inset-0 z-50 my-4 mx-4 h-16 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 flex justify-between items-center p-4">
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <RiMenuFold3Fill className="text-xl" />
            ) : (
              <RiMenuFold4Fill className="text-xl" />
            )}
          </button>
          <button
            onClick={logoutFunc}
            className="flex items-center rounded-xl bg-red-200 p-2 font-semibold"
          >
            <span className="mr-2">Logout</span>
            <IoIosLogOut className="text-xl" />
          </button>
        </header>
        <div className="h-screen bg-white shadow-sm translate-x-0  inset-0 z-50 my-4 mx-4 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
