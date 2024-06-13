import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../../Api/Axios";
import { USER } from "../../../../Api/Api";
import Loading from "../../../../components/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [louding, setLoading] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setLoading(false);
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashborad/users/page/404", { replace: true }));
  }, []);
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
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
        <Form.Group className="mb-3" controlId="formBasic3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">select role</option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary" type="submit">
          Save
        </button>
      </Form>
    </>
  );
}
