import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Footer, Navbar } from "./components";
import {
  About,
  AuthPage,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
  AdminPage,
} from "./pages";
import ApplyForJob from "./pages/ApplyForJob";
import ApplicationStatus from "./pages/ApplicationStatus";
import { useSelector } from "react-redux";
import Applicants from "./pages/applicants";
import Interview from "./pages/interview";
import UserInterview from "./pages/userInterviews";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />

      <Routes>

        <Route element={<Layout />}><Route path={"/apply/:jobId"} element={<ApplyForJob />} />
        
          <Route
            path='/'
            element={<Navigate to='/find-jobs' replace={true} />}
          />
          <Route path='/find-jobs' element={<FindJobs />} />
          <Route path='/companies' element={<Companies />} />
          <Route path='/applications' element={<ApplicationStatus />} />
          <Route path='/applicants/:id' element={<Applicants />} />
          <Route path='/interviewsUser' element={<UserInterview />} />
          
          <Route
            path={
              user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />

          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<UploadJob />} />
          <Route path={"/job-detail/:id"} element={<JobDetail />} />
          <Route path={"/interviews"} element={<Interview />} />



        </Route>

        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<AuthPage />} />
<Route path='/admin' element={<AdminPage />} />
      </Routes>
      {user && <Footer />}
    </main>
  );
}

export default App;
                     