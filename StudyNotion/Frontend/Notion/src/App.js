import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';

import OpenRoute from "./Components/core/Auth/OpenRoute"; // Import OpenRoute
import Signup from "./pages/Signup"; // Import Signup
import Login from "./pages/Login"; // Import Login
import ForgotPassword from "./pages/ForgotPassword"; // Import ForgotPassword
import UpdatePassword from "./pages/UpdatePassword";
import Navbar from "./Components/common/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./Components/core/Dashboard/Settings";
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import Cart from "./Components/core/Dashboard/Cart";
import AddCourse from "./Components/core/Dashboard/AddCourse";
import MyCourses from "./Components/core/Dashboard/MyCourses"
import EditCourse from "./Components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./Components/core/ViewCourse/VideoDetails";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Instructor from "./Components/core/Dashboard/InstructorDashboard/Instructor";
function App() {

  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />


        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <Contact />
          }
        />

        {/* Becoz login nahi ho paa rahe
        and mujhe iss page pe jaana hai to OpenRoute use kr lenge */}
        {/* <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        /> */}


        <Route
          path="dashboard/my-profile"
          element={
            <OpenRoute>
            <Dashboard/>
            </OpenRoute>
          }
        />


        <Route path="dashboard/my-profile" element={<MyProfile />}/>
        <Route path="dashboard/Settings" element={<Settings />}/>


        <Route path="dashboard/cart" element={<Cart/>}/>
        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />

        
        <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />


          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                element={<VideoDetails />}
              />
            </>
          )}


      <Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
}

export default App;