import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
  const register = async (body) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8080/api/v1/users/signup",
        body
      );
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      // alert(err.response.data.message);
      console.log(err);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    register(body);
    e.target.name.value = "";
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
          <h3>Welcome Back!</h3>
          <p>To connected with us please SignIn with your personal info</p>
          <Link to="/signin" className="btn sign-up-btn">
            SignIn
          </Link>
        </div>
        <div className="login-right-content">
          <form
            method="POST"
            action=""
            className="login-form"
            onSubmit={handleSubmit}
          >
            <input type="text" placeholder="Enter Name" name="name" required />
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
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
