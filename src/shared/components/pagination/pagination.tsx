import React from "react";
import { useState } from "react";
import { useEffect } from "react";

interface PaginationInterface {
  totalItems: number;
  totalPageSize: number;
  pageNumber: number;
  changePageNumber: (page: number) => void;
}
const Pagination = ({
  totalItems,
  totalPageSize,
  pageNumber,
  changePageNumber,
}: PaginationInterface) => {
  const [pageinationArray, setPaginationArray] = useState<number[]>([]);
  const [paginateGroup, setPaginateGroup] = useState<number[] | null>(null);

  useEffect(() => {
    let pageArray: number[] = [];
    const totalNumberOfPages =
      totalItems % totalPageSize === 0
        ? totalItems / totalPageSize
        : Math.floor(totalItems / totalPageSize) + 1;
    if (totalNumberOfPages) {
      for (let index = 0; index < totalNumberOfPages; index++) {
        pageArray.push(index);
      }
    }
    setPaginationArray(pageArray);
  }, [totalItems, totalPageSize, pageNumber]);

  const changePage = (type: string) => {
    if (type === "next")
      pageinationArray &&
        pageinationArray.length > 0 &&
        pageinationArray.length > pageNumber + 1 &&
        changePageNumber(pageNumber + 1);
    else
      pageinationArray &&
        pageinationArray.length > 0 &&
        pageNumber > 0 &&
        changePageNumber(pageNumber - 1);
  };

  useEffect(() => {
    setPaginateGroup(getPaginationGroup());
    // eslint-disable-next-line
  }, [pageinationArray]);

  const getPaginationGroup = () => {
    let start = 0;
    if (pageinationArray.length > 5) {
      if (pageNumber > pageinationArray.length - 3) {
        start = pageNumber - 4 + (pageinationArray.length - pageNumber - 1);
      } else if (pageNumber >= 2) {
        start = pageNumber - 2;
      }
    }
    const newArray = [];
    for (let index = 0; index < 5; index++) {
      if (start + index + 1 <= pageinationArray.length) {
        newArray.push(start + index + 1);
      }
    }
    return newArray;
  };
  return (
    <>
      <nav className="paging">
        <ul className="pagination">
          <li
            className={`page-item ${
              pageinationArray &&
              pageinationArray.length > 0 &&
              pageNumber < 1 &&
              "disabled"
            }`}
          >
            <button
              className="page-link"
              onClick={() => changePage("prev")}
              aria-label="Previous"
            >
              <span aria-hidden="true">
                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
              </span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {paginateGroup &&
            paginateGroup.length > 0 &&
            paginateGroup.map((page) => (
              <li
                className={`page-item ${
                  pageNumber === page - 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => changePageNumber(page - 1)}
                >
                  {page}
                </button>
              </li>
            ))}
          <li
            className={`page-item ${
              pageinationArray &&
              pageinationArray.length > 0 &&
              pageNumber + 1 >= pageinationArray.length &&
              "disabled"
            }`}
          >
            <button
              className="page-link"
              onClick={() => changePage("next")}
              aria-label="Next"
            >
              <span aria-hidden="true">
                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
              </span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
