import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup({setUserIsRegistered}) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorInForm, setError] = useState("");

  const handleClickOnSignUp = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !password || !username) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/signup", {
        firstName,
        lastName,
        password,
        username,
      });
      if (res.status === 200) {
        toast.success("User created successfully");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", firstName);
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
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
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center font-[Fira Code]">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 text-black">
          <h1 className="font-bold text-4xl pt-6">Sign up</h1>
          <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your infromation to create an account
          </div>
          <InputBox
            placeholder="John"
            label={"First Name"}
            type={"text"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            placeholder="Doe"
            label={"Last Name"}
            type={"text"}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            placeholder="Johndoe@gmail.com"
            label={"Email"}
            type={"email"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder="123456"
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
            <Button label={"Sign up"} onClick={handleClickOnSignUp} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
