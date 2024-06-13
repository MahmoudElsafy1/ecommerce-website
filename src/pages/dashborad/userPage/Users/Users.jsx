import React, { useEffect, useState } from "react";
import { USER, USERS } from "../../../../Api/Api";

import { Axios } from "../../../../Api/Axios";

import { Link } from "react-router-dom";

import TableShow from "../../../../components/dashborad/TableShow";

export default function Users() {
  const [user, setUser] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  const [total, setTotal] = useState(0);

  async function getUsers() {
    try {
      let res = await Axios.get(`/${USERS}?limit=${limit}&page=${page}`);
      setLoading(true);
      setUser(res.data.data);
      setTotal(res.data.total);
      setLoading(false);
    } catch (erroe) {
      console.log(erroe);
      setLoading(false);
    }
  }

  useEffect(() => {
    Axios.get(`${USER}`).then((data) => setCurrentUser(data.data));
  }, []);
  useEffect(() => {
    getUsers();
  }, [limit, page]);

  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUser((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  const header = [
    { key: "name", name: "Username" },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
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
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashborad/user/add">
          Add User
        </Link>
      </div>
      <TableShow
        header={header}
        data={user}
        delete={handleDelete}
        currentUser={currentUser}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
        loading={loading}
        search="name"
        searchLink={USER}
      />
    </div>
  );
}
