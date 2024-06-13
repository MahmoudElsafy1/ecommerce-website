import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

export default function PaginatedItems({ itemsPerPage, setPage, total }) {
  const pageCount = Math.ceil(total / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<< "
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination"
        pageLinkClassName="pagination-a rounded-circle"
        activeLinkClassName="active-page text-white"
        pageClassName="mx-2"
      />
    </>
  );
}
