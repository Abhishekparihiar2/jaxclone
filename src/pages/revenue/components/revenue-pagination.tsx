import Pagination from "../../../shared/components/pagination/pagination";

const RevenuePagination = ({
  count,
  pageNumber,
  pageSize,
  changePage
}: {
  count: number,
  pageSize: number,
  pageNumber: number,
  changePage: (page: number)=>void
}) => {
    return (
      <div className="table-paging">
      <Pagination
          totalItems={count || 5}
          totalPageSize={pageSize}
          pageNumber={pageNumber}
          changePageNumber={(page) => changePage(page)}
      />
    </div>
    );
  };
  
  export default RevenuePagination;
  