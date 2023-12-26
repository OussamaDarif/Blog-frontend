import { Outlet } from "react-router-dom";
import Navbar from "./navbar.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Layout() {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
