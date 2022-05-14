import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ForgotPassword, VerifyOtp } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
