import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../../Api/Axios";
import { Cat } from "../../../../Api/Api";
import Loading from "../../../../components/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [disable, setDisable] = useState(true);
  const [louding, setLoading] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setLoading(false);
        setTitle(data.data.title);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashborad/categories/page/404", { replace: true }));
  }, []);
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("image", image);
      await Axios.post(`${Cat}/edit/${id}`, form);
      window.location.pathname = "/dashborad/categories";
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>
        <button disabled={disable} className="btn btn-primary" type="submit">
          Save
        </button>
      </Form>
    </>
  );
}
