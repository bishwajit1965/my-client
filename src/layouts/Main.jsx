import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/navBar/NavBar";
import Footer from "../pages/shared/footer/Footer";

const Main = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
