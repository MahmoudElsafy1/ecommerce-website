import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../../Api/Axios";
import { CAT, Cat, Pro } from "../../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const focus = useRef("");
  const openImages = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  const [images, setImages] = useState([]);
  const [imagesServer, setImagesServer] = useState([]);
  const [idImagesServer, setdImagesServer] = useState([]);
  const [louding, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  async function getCategories() {
    try {
      let res = await Axios.get(`/${CAT}`);
      setCategories(res.data);
    } catch (erroe) {
      console.log(erroe);
    }
  }

  useEffect(() => {
    focus.current.focus();
    getCategories();
  }, []);

  useEffect(() => {
    Axios.get(`/${Pro}/${id}`).then((data) => {
      setForm(data.data[0]);
      setImagesServer(data.data[0].images);
    });
  }, []);
  //   handleChange function
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    // const data = new FormData();
    // data.append("category", form.category);
    // data.append("title", form.title);
    // data.append("description", form.description);
    // data.append("price", form.price);
    // data.append("discount", form.discount);
    // data.append("About", form.About);
    // for (let i = 0; i < images.length; i++) {
    //   data.append("images[]", images[i]);
    // }
    for (let i = 0; i < idImagesServer.length; i++) {
      let res = await Axios.delete(`product-img/${idImagesServer[i]}`);
    }
    try {
      await Axios.post(`${Pro}/edit/${id}`, form);
      nav("/dashborad/products");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const j = useRef(-1);
  //image handle Change

  async function handleImageChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imgs = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imgs.length; i++) {
      j.current++;
      data.append("image", imgs[i]);
      data.append("product_id", id);
      try {
        let res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (ProgressEvent) => {
            const { total, loaded } = ProgressEvent;

            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleDelete(id, img) {
    const findId = ids.current[id];
    try {
      let res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((imge) => imge !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteImageFormServer(id) {
    setImagesServer((prev) => prev.filter((img) => img.id !== id));
    setdImagesServer((prev) => {
      return [...prev, id];
    });
    // try {
    //
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const showCategories = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));
  const imageShow = images.map((img, key) => (
    <div key={key} className=" border w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img src={URL.createObjectURL(img)} width="80px" alt="" />
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "kb"
                : (img.size / (1024 * 1024)).toFixed(2) + "mb"}
            </p>
          </div>
        </div>
        <Button variant="danger" onClick={() => handleDelete(key, img)}>
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          // style={{ width: `${uploading}%` }}
          // percent={`${uploading}%`}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));
  const imageServerShow = imagesServer.map((img, key) => (
    <div key={key} className=" border position-relative col-2 p-2">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <div className="d-flex align-items-center gap-2">
          <img src={img.image} className="w-100" alt="" />
        </div>
        <div
          style={{ cursor: "pointer" }}
          className="position-absolute top-0 end-0 bg-danger rounded text-white"
        >
          <p
            className="py-1 px-2 m-0"
            onClick={() => handleDeleteImageFormServer(img.id)}
          >
            x
          </p>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      {louding && <Loading />}
      <Form className="bg-white w-100 p-3 mx-3" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Select
            ref={focus}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option disabled>Select Category</option>
            {showCategories}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            name="title"
            placeholder="Title..."
            value={form.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            required
            name="description"
            placeholder="Description..."
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            required
            name="price"
            placeholder="Price..."
            value={form.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            required
            name="discount"
            placeholder="Discount..."
            value={form.discount}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            required
            name="About"
            placeholder="About..."
            value={form.About}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Images</Form.Label>
          <Form.Control
            multiple
            hidden
            ref={openImages}
            type="file"
            onChange={handleImageChange}
          />
        </Form.Group>
        <div
          onClick={() => openImages.current.click()}
          className="d-flex align-items-center justify-content-center flex-column gap-2 py-3 rounded mb-2 "
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("./../../../../assets/uploading.webp")}
            alt="uploading Here"
            width="100px"
            style={{}}
          />
          <p className="mb-0 fw-bold" style={{ gray: "#0086fe" }}>
            Upload Image
          </p>
        </div>
        <div className="d-flex align-items-start flex-wrap gap-2 ">
          {imageServerShow}
        </div>
        <div className="d-flex align-items-start flex-column gap-2 ">
          {imageShow}
        </div>

        <button
          disabled={form.title.length > 1 ? false : true}
          className="btn btn-primary mt-2"
          type="submit"
        >
          Save
        </button>
      </Form>
    </>
  );
}
