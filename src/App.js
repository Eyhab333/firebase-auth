import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HTML from "./pages/html";
import Css from "./pages/css";
import Profile from "./pages/profile";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from './pages/Singin';
import Signup from './pages/Signup';
import Erroe404 from './pages/erroe404';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Erroe404 />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },


  {
    path: "/signup",
    element: <Signup />,
  },



  {
    path: "/html",
    element: <HTML />,
  },

  {
    path: "/css",
    element: <Css />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
