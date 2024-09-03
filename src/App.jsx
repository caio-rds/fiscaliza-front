import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./components/main";
import NoLogin from "./components/home";
import Reports from "./components/reportsPage";
import Login from "./components/login";
import RegisterUser from "./components/userCreate";
import RecoveryUser from "./components/recovery";
import MyProfile from "./components/profile";
import ReportRegister from "./components/reportRegister";
import SearchReport from "./components/reportSearch";
import PrivateRoutes from "./routes/PrivateRoutes";
import UnauthRoutes from "./routes/UnauthRoutes";
import AboutUs from "./components/aboutUs";



export default function App() {
  return (
    <Main>      
      <BrowserRouter>
        <Routes>
          <Route element={<UnauthRoutes />}>
            <Route index path="/" element={<NoLogin />} />
            <Route index path="/inicio" element={<NoLogin />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/register" element={<RegisterUser />} />
            <Route index path="/recovery" element={<RecoveryUser />} />
            <Route index path="/about" element={<AboutUs />} />
          </Route> 
          <Route element={<PrivateRoutes />}>
            <Route index path="/reports" element={<Reports />} />
            <Route index path="/reports/new" element={<ReportRegister />} />
            <Route index path="/reports/search/:id" element={<SearchReport />} />
            <Route index path="/reports/search" element={<SearchReport />} />
            <Route index path="/profile" element={<MyProfile />} />
          </Route>


        </Routes>
      </BrowserRouter>
      </Main>
  );
}
