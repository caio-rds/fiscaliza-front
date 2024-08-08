import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./components/main";
import NoLogin from "./components/home";
import Reports from "./components/reports";
import Login from "./components/login";
import RegisterUser from "./components/userCreate";
import RecoveryUser from "./components/recovery";
import MyProfile from "./components/profile";
import ReportRegister from "./components/reportRegister";

export default function App() {
  return (
    <Main>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<NoLogin />} />
          <Route index path="/inicio" element={<NoLogin />} />
          <Route index path="/reports" element={<Reports />} />
          <Route index path="/reports/new" element={<ReportRegister />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="/register" element={<RegisterUser />} />
          <Route index path="/recovery" element={<RecoveryUser />} />
          <Route index path="/profile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </Main>
  );
}
