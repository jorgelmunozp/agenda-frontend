import { Routes, Route } from "react-router-dom";
import { Home } from '../pages/Home.js';
import { Task } from '../pages/Task.js'

const urlBaseFrontend = process.env.REACT_APP_FRONTEND_URL;

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Routes>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/"} element={<Home />} />
            <Route path={"/users/:userId/tasks/:taskId"} element={<Task />} />
            <Route path={"*"} element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default DashboardRoutes;