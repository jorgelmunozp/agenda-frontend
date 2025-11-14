import { Routes, Route } from "react-router-dom";
import { AppMenu } from '../components/menu/AppMenu.js';
import { Home } from '../modules/home/Home.js';
import { Task } from '../modules/task/Task.js'
import { AboutUs } from '../modules/core/aboutus/AboutUs.js';
import { Contact } from '../modules/core/contact/Contact.js';

export const DashboardRoutes = () => {
  return (
    <>
      <AppMenu />
      <div>
        <Routes>
          <Route path={'/home'} element={<Home />} />
          <Route path={'/about-us'} element={<AboutUs />} />
          <Route path={'/contact'} element={<Contact />} />
          <Route path={'/users/:userId/tasks/:taskId'} element={<Task />} />
          <Route path={'/'} element={<Home />} />
          <Route path={'*'} element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default DashboardRoutes;