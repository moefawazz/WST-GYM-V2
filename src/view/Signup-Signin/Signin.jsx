import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext.js";
import Input from "../../components/input/Input.jsx";
import Button from "../../components/button/Button.jsx";
import { ToastContainer,toast } from "react-toastify";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
toast.error("Email or password are incorrect!")
    }
  };

  return (
    <div className="p-[1.5rem] min-h-screen flex flex-col justify-center">
      <ToastContainer/>
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        <p className="py-2">
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            type="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password</label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            type="password"
          />
        </div>
        <div className="my-4">
          <Button title="Sign In" width="w-full" />
        </div>
      </form>
    </div>
  );
};

export default Signin;
