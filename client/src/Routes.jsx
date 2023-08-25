import Signup from "./pages/signup/SignupPage";
import Signin from "./pages/signin/SigninPage";
import User from "./pages/user/UserPage";
import Home from "./pages/Home/Home";
import Layout from "./pages/layout/layout";
import JobPoster from "./pages/job-poster/PosterJobs";
import PosterApplicants from "./pages/job-poster/PosterApplicants";
import AllJobs from "./pages/admin/AllJobs";
import AllUsers from "./pages/admin/AllUsers";
// import { Navigate } from "react-router-dom";

const routeList = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      // user routes
      {
        path: "/jobs",
        element: <User />,
      },
      // job-poster
      {
        path: "/poster-jobs",
        element: <JobPoster />,
      },
      {
        path: "/poster-applicants",
        element: <PosterApplicants />,
      },
      // admin:
      {
        path: "/",
        element: <AllJobs />,
      },

      {
        path: "/all-users",
        element: <AllUsers />,
      },
    ],
  },
];
export default routeList;
