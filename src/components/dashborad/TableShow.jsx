import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import PaginatedItems from "./Pagination/Pagination";
import TransformData from "../../helpers/TransformData";

export default function TableShow(props) {
  // const paginateData = [];
  // if (props.data.length !== 0) {
  //   for (
  //     let i = (props.page - 1) * props.limit;
  //     i < props.page * props.limit;
  //     i++
  //   ) {
  //     paginateData.push(props.data[i]);
  //   }
  // }
  // const start = (props.page - 1) * props.limit;
  // const end = Number(start) + Number(props.limit);
  // const final = props.data.slice(start, end);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const currentUser = props.currentUser || { name: "" };
  const [filterData, setFilterData] = useState([]);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const filterDate = props.data.filter(
    (item) => TransformData(item.created_at) === date
  );
  const filterSearchDate = filterData.filter(
    (item) => TransformData(item.created_at) === date
  );

  const showWhichData =
    date.length !== 0
      ? search.length > 0
        ? filterSearchDate
        : filterDate
      : search.length > 0
      ? filterData
      : props.data;
  async function getSearchValue() {
    try {
      let res = await Axios.post(`/${props.searchLink}/search?title=${search}`);
      setFilterData(res.data);

      setLoadingSearch(false);
    } catch (erroe) {
      console.log(erroe);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchValue() : setLoadingSearch(false);
    }, 800);
    return () => clearTimeout(debounce);
  }, [search]);

  const showHeader = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  const showData = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width={"50px"} alt="" src={item[item2.key]} />
          ) : item2.key === "images" ? (
            <div className="d-flex aling-items-center justify-content-start gap-2 flex-wrap">
              {item[item2.key].map((img, i) => (
                <img key={i} width={"50px"} alt="" src={img.image} />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformData(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : currentUser && currentUser.name === item[item2.key] ? (
            item[item2.key] + " (you)"
          ) : (
            item[item2.key]
          )}
        </td>
      ))}
      <td>
        <div className="d-flex  align-items-center gap-2">
          <Link to={`${item.id}`}>
            {" "}
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>

          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              color="red"
              fontSize={"19px"}
              icon={faTrash}
              cursor={"pointer"}
            />
          )}
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="d-flex ">
        <div className="col-3 mx-2">
          <Form.Control
            className="my-2"
            type="search"
            placeholder="search"
            aria-label="input-exmpele"
            onChange={(e) => {
              setSearch(e.target.value);
              setLoadingSearch(true);
            }}
          ></Form.Control>
        </div>
        <div className="col-3">
          <Form.Control
            className="my-2"
            type="date"
            placeholder="Date"
            aria-label="input-exmpele"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></Form.Control>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {showHeader}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.loading ? (
            <tr>
              <td colSpan={"12"} className="text-center">
                Loading...
              </td>
            </tr>
          ) : loadingSearch ? (
            <tr>
              <td colSpan={"12"} className="text-center">
                searching...
              </td>
            </tr>
          ) : (
            showData
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end">
        <div className="col-2">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          itemsPerPage={props.limit}
          data={props.data}
          setPage={props.setPage}
          total={props.total}
        />
      </div>
    </>
  );
}
