import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import Cookie from "cookie-universal";
import { LOGIN, baseUrl } from "../../../../Api/Api";
import Loading from "../../../../components/loading/Loading";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const foucs = useRef("");

  const [err, setErr] = useState("");
  const [loading, setLOading] = useState(false);
  const cookie = Cookie();
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLOading(true);
    try {
      let res = await axios.post(`${baseUrl}/${LOGIN}`, form);
      setLOading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token, { path: "/" });
      const role = res.data.user.role;
      const go =
        role === "1995"
          ? "dashborad/users"
          : role === "1996"
          ? "dashborad/writer"
          : "";

      window.location.pathname = `/${go}`;
    } catch (error) {
      setLOading(false);
      if (error.response.status === 401) {
        setErr("Wrong Eamil or Password ");
      } else {
        setErr("Internal server err");
      }
    }
  }
  useEffect(() => {
    foucs.current.focus();
  }, []);
  return (
    <>
      {loading && <Loading />}

      <div className="parent height-100 ">
        <div className="bg-overlay bg-white"></div>
        <div className="container ">
          <div className="d-flex flex-column min-vh-100 px-3 pt-4 ">
            <div className="row justify-content-center my-auto">
              <div className="col-md-8 col-lg-6 col-xl-4">
                <div className="text-center py-5 ">
                  <div className="mb-4 mb-md-5 z-index">
                    <span className="d-block logo"></span>
                  </div>

                  <div className="mb-4 z-index">
                    <h5>Welcome Back !</h5>
                    <p>Sign in to continue to Dashonic.</p>
                  </div>
                  <form className="" onSubmit={handleSubmit}>
                    <div className="mb-3 form-floating form-floating-custom">
                      <div className="form-floating-icon">
                        <i className="  fa-regular fa-envelope"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={form.email}
                        placeholder="Enter Your Email.."
                        onChange={handleChange}
                        ref={foucs}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="mb-3 form-floating form-floating-custom">
                      <div className="form-floating-icon">
                        <i className="fa-solid fa-lock"></i>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        className="form-control"
                        id="password"
                        placeholder="Enter Your Password.."
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-check form-check-info font-size-16 z-index">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-check"
                      />
                      <label
                        className="form-check-label font-size-14"
                        htmlFor="remember-check"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="mt-3 z-index">
                      <button className="btn btn-primary w-100" type="submit">
                        Log In
                      </button>
                      {err !== "" && <span className="error">{err}</span>}
                    </div>
                    <div className="mt-4 z-index">
                      <a
                        href="/#"
                        className="text-muted text-decoration-underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="mt-3 z-index">
                      <a href={`http://127.0.0.1:8000/login-google`}>
                        <button type="button" className="login-with-google-btn">
                          Sign in with Google
                        </button>
                      </a>
                    </div>
                  </form>
                  <div className="mt-5 text-center z-index">
                    <div>
                      <p>
                        Don't have an account ?
                        <Link
                          to="/register"
                          className="fw-medium text-decoration-underline"
                        >
                          Signup
                        </Link>
                      </p>
                      <p />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
