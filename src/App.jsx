import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Home from "./pages/Home";
import CompanySignUpPage from "./components/CompanySignUpPage";
import LoginPageCompany from "./pages/LoginPageCompany";
import ProfilePageCompany from "./pages/ProfilePageCompany";
import UploadCV from "./pages/UploadCV";
import ProfileSetup from "./pages/ProfileSetup";
import ProfilePageUser from "./pages/ProfilePageUser";
import FeaturedJobs from "./components/FeaturedJobs";
import HomeCompany from "./pages/HomeCompany";
import Category from "./pages/Category";
import JobPortalSections from "./components/JobPortalSections";
import Jobportalapp from "./components/JobPortalApp";
import CompanyDashboard from "./components/CompanyDashboard";
import UserJobsPage from "./components/UserJobsPage";
import MyApplications from "./components/MyApplications";


export default function App() {
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/HomeCompany" element={<HomeCompany />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/loginpagecompany" element={<LoginPageCompany />} />
          <Route path="/Company" element={<CompanySignUpPage />} />
          <Route path="/ProfilePageCompany" element={<ProfilePageCompany />} />
          <Route path="/ProfilePageUser" element={<ProfilePageUser />} />
          <Route path="/UploadCV" element={<UploadCV />} />
          {/* <Route path="/Jobportalapp" element={<Jobportalapp />} />*/}
          <Route path="/FeaturedJobs" element={<FeaturedJobs />} />
          <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
          <Route path="/UserJobsPage" element={<UserJobsPage />} />
          <Route path="/MyApplications" element={<MyApplications />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="*" element={<h1 className="flex justify-center items-center text-3xl">404 | Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}