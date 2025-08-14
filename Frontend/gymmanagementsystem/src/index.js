import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/globals.css";
import Home from "./Components/Home";
import AboutPage from "./Components/About";
import ContactPage from "./Components/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./Components/SignIn";
import MembershipForm from "./Components/SignUp";
import Trainer from "./Components/Trainers";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import UpdateMemberForm from "./Components/Updatepage";
import NutritionGuidance from "./Components/NutritionGuidance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="SignIn" element={<SignIn />}></Route>
        <Route path="SignUp" element={<MembershipForm />}></Route>
        <Route path="Home" element={<Home />}></Route>
        <Route path="About" element={<AboutPage />}></Route>
        <Route path="Contact" element={<ContactPage />}></Route>
        <Route path="Trainers" element={<Trainer />}></Route>
        <Route path="AdminDashboard" element={<AdminDashboard />}></Route>
        <Route path="UserDashboard" element={<UserDashboard />}></Route>
        <Route path="Updatepage/:id" element={<UpdateMemberForm />}></Route>
        <Route path="NutritionGuidance" element={ <NutritionGuidance />}></Route>
      </Routes>
    </BrowserRouter>
  </>
);
