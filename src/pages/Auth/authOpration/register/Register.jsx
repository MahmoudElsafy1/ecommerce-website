import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { REGISTER, baseUrl } from "../../../../Api/Api";
import { Link } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import Cookie from "cookie-universal";

export default function Register() {
  const focus = useRef("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      let res = await axios.post(`${baseUrl}/${REGISTER}`, form);
      setLOading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token, { path: "/" });
      window.location.pathname = "/dashborad/users";
    } catch (error) {
      setLOading(false);
      if (error.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server ERR");
      }
    }
  }
  useEffect(() => {
    focus.current.focus();
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
                    <h5 className="h5">Register Account</h5>
                    <p>Get your free Dashonic account now.</p>
                  </div>
                  <form className="" onSubmit={handleSubmit}>
                    <div className="mb-3 form-floating form-floating-custom">
                      <div className="form-floating-icon">
                        <i className="fa-regular fa-user"></i>
                      </div>
                      <input
                        type="text"
                        id="name"
                        ref={focus}
                        className="form-control"
                        placeholder="Enter Your Name.."
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="name">Username</label>
                    </div>
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
                        required
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
                        minLength={6}
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="text-start z-index">
                      <p>
                        By registering you agree to the Dashonic{" "}
                        <a href="/#" className="text-decoration-underline">
                          Terms of Use
                        </a>
                      </p>
                    </div>
                    <div className="mt-3 z-index">
                      <button className="btn btn-primary w-100" type="submit">
                        Register
                      </button>
                      {err !== "" && <span className="error">{err}</span>}
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
                    <p>
                      Already have an account ?
                      <Link
                        to="/login"
                        className="fw-medium text-decoration-underline"
                      >
                        Signin
                      </Link>
                    </p>
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
