import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.png";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth/authContext";
import { useLogout } from "../graphql/hooks";

const Navbar = () => {
  const [setBoxVisibility, setSearchBoxVisibility] = useState(false);
  const { user, dispatch } = useAuthContext();
  const { logout, error } = useLogout();
  const handleLogout = async () => {
    await logout();
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/home" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>
        <span className="text-xl font-bold">Med Blog</span>
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " +
            (setSearchBoxVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 p1-6 pr-[12%]
                        md:pr-6 rounded-full placeholder:text-dark-grey md:p1-12"
          />
        </div>
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full 
                    flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <i className="fi fi-rr-search text-x1"></i>
          </button>
          {user && (
            <Link to="/blogeditor" className="hidden md:flex gap-2 link">
              <i className="fi fi-rr-file-edit"></i>
              <p>Write</p>
            </Link>
          )}
          {user ? (
            <>
              <h1>Hello {user.firstname + "_" + user.lastname}</h1>
              <button className="btn-dark py-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>
              <Link className="btn-light py-2 hidden md:block " to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
