import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Feedback from "./pages/Feedback/Feedback";
const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />

        <Route path={"/Register"} element={<Register />} />
        <Route path={"/Feedback"} element={<Feedback />} />
      </Routes>
    </>
  );
};

export default App;
