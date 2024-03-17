import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";

function App() {
  const [userIsRegisterd, setUserIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfUserIsRegistered = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setUserIsRegistered(true);
      }
      setIsLoading(false)
    };
    checkIfUserIsRegistered();
  }, []);

  useEffect(() => {
    console.log(userIsRegisterd);
  }, [userIsRegisterd]);

  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          {userIsRegisterd ? (
            <Route path="/" element={<Navigate to={"/dashboard"} />} />
          ) : (
            <Route path="/" element={<Navigate to={"/signin"} />} />
          )}
          <Route
            path="/signup"
            element={<Signup setUserIsRegistered={setUserIsRegistered} />}
          />
          <Route
            path="/signin"
            element={<Signin setUserIsRegistered={setUserIsRegistered} />}
          />
          {userIsRegisterd ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/dashboard" element={<Navigate to={"/signin"} />} />
          )}
          {userIsRegisterd ? (
            <Route path="/send" element={<SendMoney />} />
          ) : (
            <Route path="/send" element={<Navigate to={"/signin"} />} />
          )}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
