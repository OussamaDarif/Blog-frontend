import { useState } from "react";
import { useRegister } from "../graphql/hooks";
import InputBox from "./input.component";
import { Link, Navigate } from "react-router-dom";
import { isLoggedIn } from "../graphql/utils";
import { useAuthContext } from "../context/auth/authContext";

const UserSignUpForm = () => {
  const { register, loading } = useRegister();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const {user} = useAuthContext();  

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register({
      email,
      firstname,
      lastname,
      password,
    });
  };

  return user ? <Navigate  to={"/home"} /> : (
    <section className="h-screen flex items-center justify-center">
      <form className="w-[80%] max-w-[400px] mx-auto">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          Join Us Today
        </h1>
        <InputBox
          name="firstname"
          type="te8xt"
          placeholder="First Name"
          icon="fi-rr-user"
          value={firstname}
          onChangeHandler={(event) => setFirstname(event.target.value)}
          on
        />

        <InputBox
          name="lastname"
          type="te8xt"
          placeholder="Last Name"
          icon="fi-rr-user"
          value={lastname}
          onChangeHandler={(event) => setLastname(event.target.value)}
        />

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
          disabled={loading}
          onClick={handleSubmit}
          className="btn-dark center mt-14"
          type="submit"
        >
          Sign Up
        </button>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <p className="mt-6 text-dark-grey text-xk text-center">
          Have already an account?
          <Link to="/signin" className="underline text-black text-x1 ml-1">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default UserSignUpForm;
