import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useEffect } from "react";
function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!localStorage.getItem("token")) return <></>;
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
export default Layout;
