import { Routes, Route } from "react-router-dom";
import { Home } from '../pages/Home.js';

const urlBaseFrontend = process.env.REACT_APP_FRONTEND_URL;

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Routes>
            <Route path={urlBaseFrontend + "/home"} element={<Home />} />
            <Route path={"/" + urlBaseFrontend} element={<Home />} />
            <Route path={"/*"} element={<Home />} />
            <Route path={"/"} element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default DashboardRoutes;