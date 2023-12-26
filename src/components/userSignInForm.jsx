import InputBox from "./input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../graphql/hooks";
import { isLoggedIn } from "../graphql/utils";
import { useAuthContext } from "../context/auth/authContext";

const UserSignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();
  const {user} = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({
      email,
      password,
    });
  };

  return user ? <Navigate to={"/home"} /> : (
    <section className="h-screen flex items-center justify-center">
      <form className="w-[80%] max-w-[400px] mx-auto">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          Welcome Back
        </h1>

        <InputBox
          name="email"
          type="email"
          placeholder="Email"
          icon="fi-rr-envelope"
          value={email}
          onChangeHandler={(event) => setEmail(event.target.value)}
        />
        <InputBox
          name="password"
          type="password"
          placeholder="Password"
          icon="fi-rr-key"
          value={password}
          onChangeHandler={(event) => setPassword(event.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-dark center mt-14"
          type="submit"
        >
          Sign in
        </button>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>
        <p className="mt-6 text-dark-grey text-xk text-center">
          No Account yet?
          <Link to="/signup" className="underline text-black text-x1 ml-1">
            Sign up here.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default UserSignInForm;
