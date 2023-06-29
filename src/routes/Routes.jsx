import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import NotFound from "../pages/notFound/NotFound";
import Home from "../pages/home/Home";
import AboutUs from "../pages/about/AboutUs";
import ContactUs from "../pages/contact/ContactUs";
import OurServices from "../pages/services/OurServices";
import Students from "../pages/students/Students";
import EditStudent from "../pages/editStudent/EditStudent";
import AddStudent from "../pages/addStudent/AddStudent";
import PrivateRoute from "../pages/privateRoute/PrivateRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import AllUsers from "../pages/users/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/services",
        element: <OurServices />,
      },
      {
        path: "/students",
        element: <Students />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />,
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <AllUsers />,
          </PrivateRoute>
        ),
      },
      {
        path: "/add-student",
        element: (
          <PrivateRoute>
            <AddStudent />,
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-student/:id",
        element: (
          <PrivateRoute>
            <EditStudent />,
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/students/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
