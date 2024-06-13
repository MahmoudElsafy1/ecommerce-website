import React, { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { PRO, Pro } from "../../../../Api/Api";
import { Link } from "react-router-dom";
import TableShow from "../../../../components/dashborad/TableShow";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  async function getProducts() {
    try {
      setLoading(true);
      let res = await Axios.get(`/${PRO}?limit=${limit}&page=${page}`);
      setProducts(res.data.data);
      setTotal(res.data.total);
      setLoading(false);
    } catch (erroe) {
      console.log(erroe);
      setLoading(false);
    }
  }
  async function handleDelete(id) {
    try {
      await Axios.delete(`${Pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [limit, page]);
  const header = [
    {
      key: "images",
      name: "Images",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
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
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashborad/product/add">
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        delete={handleDelete}
        data={products}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        total={total}
        loading={loading}
        search="title"
        searchLink={Pro}
      />
    </div>
  );
}
