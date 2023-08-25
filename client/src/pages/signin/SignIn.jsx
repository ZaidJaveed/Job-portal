import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function SignIn() {
  const navigate = useNavigate();
  const login = async (body) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8080/api/v1/users/login",
        body
      );
      // console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      if (err.response.data.status === "fail")
        alert(`No such user! please register`);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login(body);
    e.target.email.value = "";
    e.target.password.value = "";
  }

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []); //eslint-disable-line
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left-content">
          <h3>Hello!</h3>
          <p>Enter your personal details and start your journey with us.</p>
          <Link to="/signup" className="btn sign-up-btn">
            SignUp
          </Link>
        </div>
        <div className="login-right-content">
          <form
            method="POST"
            action=""
            className="login-form"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
            <button type="submit" className="btn sign-in-btn ">
              SignIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
