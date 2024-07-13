import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
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
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
