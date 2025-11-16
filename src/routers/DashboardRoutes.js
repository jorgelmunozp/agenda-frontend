import { Route, Routes } from 'react-router-dom';
import { AboutUs } from '../app/core/AboutUs.js';
import { Contact } from '../app/core/Contact.js';
import { Home } from '../app/home/Home.js';
import { Task } from '../app/task/Task.js';
import { AppMenu } from '../components/menu/AppMenu.js';

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
};

export default DashboardRoutes;
