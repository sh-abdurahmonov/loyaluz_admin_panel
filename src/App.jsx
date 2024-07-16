import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Blogs,
  Categories,
  Dashboard,
  Login,
  Faqs,
  News,
  Services,
  Sources,
} from "./pages";
import PageNotFound from "./components/notfound/PageNotFound";
const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/faqs",
          element: <Faqs />,
        },
        {
          path: "/sources",
          element: <Sources />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/news",
          element: <News />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
};

export default App;
