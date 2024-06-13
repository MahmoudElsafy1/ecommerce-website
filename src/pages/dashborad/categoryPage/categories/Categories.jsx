import React, { useEffect, useState } from "react";

import { CAT, Cat } from "../../..//../Api/Api";
import { Link } from "react-router-dom";
import TableShow from "../../../../components/dashborad/TableShow";
import { Axios } from "../../../../Api/Axios";
import { Form } from "react-bootstrap";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  async function getCategories() {
    try {
      setLoading(true);
      let res = await Axios.get(`/${CAT}?limit=${limit}&page=${page}`);
      setCategories(res.data.data);
      setTotal(res.data.total);
      setLoading(false);
    } catch (erroe) {
      console.log(erroe);
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await Axios.delete(`${Cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, [limit, page]);
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "image",
    },
    {
      key: "created_at",
      name: "Create",
    },
    {
      key: "updated_at",
      name: "Update",
    },
  ];
  return (
    <div className="bg-white p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashborad/category/add">
          Add Category
        </Link>
      </div>

      <TableShow
        limit={limit}
        page={page}
        header={header}
        delete={handleDelete}
        data={categories}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
        loading={loading}
        search="title"
        searchLink={Cat}
      />
    </div>
  );
}
