import React, { useState } from "react";
import Loading from "../../../../components/loading/Loading";
import { Form } from "react-bootstrap";
import { Axios } from "../../../../Api/Axios";
import { USER } from "../../../../Api/Api";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [louding, setLoading] = useState(false);
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      window.location.pathname = "/dashborad";
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      {louding && <Loading />}
      <Form className="bg-white w-100 p-3 mx-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email.."
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password.."
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">select role</option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 1 &&
            email.length > 1 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-primary"
          type="submit"
        >
          Save
        </button>
      </Form>
    </>
  );
}
