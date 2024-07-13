import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="container max-w-7xl px-3">
      <h1>Welcome to Dashboard</h1>
      <Outlet />
    </section>
  );
};

export default Dashboard;
