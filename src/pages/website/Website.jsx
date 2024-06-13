import React from "react";
import NavBar from "../../components/website/navBar/NavBar";
import { Outlet } from "react-router-dom";

export default function Website() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
