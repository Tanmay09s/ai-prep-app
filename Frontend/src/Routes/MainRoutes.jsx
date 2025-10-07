import Login from "@/Pages/Login";
import MainPage from "@/Pages/MainPage";
import Register from "@/Pages/Register";
import Session from "@/Pages/Session";
import SessionDetails from "@/Pages/SessionDetails";

import { Route, Routes } from "react-router-dom";
import { ProtecRoutes } from "./ProtecRoutes";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/session"
        element={
          <ProtecRoutes>
            <Session />
          </ProtecRoutes>
        }
      />
      <Route
        path="/session/:id"
        element={
          <ProtecRoutes>
            <SessionDetails />
          </ProtecRoutes>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
