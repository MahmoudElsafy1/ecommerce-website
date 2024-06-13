import React from "react";
import { LOGOUT } from "../../../../Api/Api";

import { Axios } from "../../../../Api/Axios";

export default function Logout() {
  async function handleLogout() {
    try {
      let res = await Axios.get(`/${LOGOUT}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
}
