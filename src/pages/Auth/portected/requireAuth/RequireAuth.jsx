import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { USER } from "../../../../Api/Api";
import Loading from "../../../../components/loading/Loading";
import { Axios } from "../../../../Api/Axios";
import Err403 from "../../error/403/Err403";

export default function RequireAuth({ allowedRole }) {
  const [user, setUser] = useState("");
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
