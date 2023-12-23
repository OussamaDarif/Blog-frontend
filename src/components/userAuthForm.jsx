import InputBox from "./input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";

const UserAuthForm = () => {
    return (
      <section className="h-screen flex items-center justify-center">
        <form className="w-[80%] max-w-[400px] mx-auto">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          Join Us Today
          </h1>
            <InputBox
              name="full name"
              type="te8xt"
              placeholder="Full name"
              icon="fi-rr-user"
            />
          
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />
        <button className="btn-dark center mt-14" type="submit">
           Sign Up
        </button>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>
        <button className="btn-dark flex items-center justify-center gap-4 w-full md:w-[50%] mx-auto">
          <img src={googleIcon} alt="Google Icon" className="w-6 h-6" />
          <span>Continue with Google</span>
        </button>
          <p className="mt-6 text-dark-grey text-xk text-center">
            Don't have an account?
            <Link to="/signup" className="underline text-black text-x1 ml-1">
              Join us today
            </Link>
          </p>
      </form>
    </section>
  );
};

export default UserAuthForm;
