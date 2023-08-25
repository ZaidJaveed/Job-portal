import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routeList from "./Routes";

function App() {
  const router = createBrowserRouter(routeList);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
