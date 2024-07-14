import { Outlet, Navigate } from "react-router-dom";

const Dashboard = () => {
  let token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="container max-w-7xl px-3">
      <h1>Welcome to Dashboard</h1>
      <Outlet />
    </section>
  );
};

export default Dashboard;
