import React from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

function Signin() {
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
          />
          <InputBox
            placeholder={"123456"}
            label={"Password"}
            type={"password"}
          />
          <div className="pt-4">
            <Button label={"Sign in"} />
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