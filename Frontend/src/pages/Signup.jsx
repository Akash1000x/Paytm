import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center font-[Fira Code]">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 text-black">
          <h1 className="font-bold text-4xl pt-6">Sign up</h1>
          <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your infromation to create an account
          </div>
          <InputBox placeholder="John" label={"First Name"} type={"text"} />
          <InputBox placeholder="Doe" label={"Last Name"} type={"text"} />
          <InputBox
            placeholder="Johndoe@gmail.com"
            label={"Email"}
            type={"email"}
          />
          <InputBox placeholder="123456" label={"Password"} type={"password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
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
