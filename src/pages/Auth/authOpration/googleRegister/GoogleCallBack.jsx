import axios from "axios";
import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import { GOOGLE_CALL_BACK, baseUrl } from "../../../../Api/Api";

export default function GoogleCallBack() {
  const location = useLocation();
  const cookie = Cookie();
  useEffect(() => {
    async function googleCall() {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token, { path: "/" });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    googleCall();
  }, []);
  return <div>tast</div>;
}
