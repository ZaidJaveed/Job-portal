import jwt_decode from "jwt-decode";
import User from "../user/UserPage";
import JobPoster from "../job-poster/PosterJobs";
import AllJobs from "../admin/AllJobs";

export default function Home() {
  const { role: userRole } = jwt_decode(localStorage.getItem("token"));

  if (userRole === "job-seeker") {
    return <User />;
  }
  if (userRole === "job-poster") {
    return <JobPoster />;
  }
  if (userRole === "admin") {
    return <AllJobs />;
  }
}
