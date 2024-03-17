import React, { useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signin({setUserIsRegistered}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorInForm, setError] = useState("");

  const handleClickOnSignIn = async (e) => {
    e.preventDefault();
    if (!password || !username) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/signin", {
        username,
        password,
      });
      if (res.status === 200) {
        toast.success("SignIn successfully");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        setUsername("");
        setPassword("");
        setError("");
        setUserIsRegistered(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 411) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
        toast.error("Network Error");
      }
    }

  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center font-[Fira Code]">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 text-black">
          <h1 className="font-bold text-4xl pt-6">Sign in</h1>
          <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your credentials to access your account
          </div>
          <InputBox
            placeholder={"Johndoe@example.com"}
            label={"Email"}
            type={"email"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder={"123456"}
            label={"Password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorInForm && (
            <p className="text-red-600 text-sm font-semibold text-start mt-1">
              {errorInForm}
            </p>
          )}

          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleClickOnSignIn} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
export default Signin;
