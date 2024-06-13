import React, { useState } from "react";
import Loading from "../../../../components/loading/Loading";
import { Form } from "react-bootstrap";
import { Axios } from "../../../../Api/Axios";
import { Cat } from "../../../../Api/Api";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [louding, setLoading] = useState(false);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${Cat}/add`, form);
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

        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
          type="submit"
        >
          Save
        </button>
      </Form>
    </>
  );
}
