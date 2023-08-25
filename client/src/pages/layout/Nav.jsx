import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/nav.css";

const navItems = {
  admin: [
    {
      name: "Jobs",
      path: "/",
    },
    {
      name: "Users",
      path: "/all-users",
    },
  ],
  "job-seeker": [
    {
      name: "All jobs",
      path: "/jobs",
    },
  ],
  "job-poster": [
    {
      name: "jobs",
      path: "/poster-jobs",
    },
    {
      name: "Applicants",
      path: "/poster-applicants",
    },
  ],
};

function Navbar() {
  const navigate = useNavigate();

  const decodedToken = jwt_decode(localStorage.getItem("token"));
  const { role } = decodedToken;
  localStorage.setItem("role", role);
  localStorage.setItem("id", decodedToken.id);

  return (
    <nav className="navbar">
      <ul>
        {navItems[role].map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive, isPending }) =>
                isActive ? "active" : ""
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
