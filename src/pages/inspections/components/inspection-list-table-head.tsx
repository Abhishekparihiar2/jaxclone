
const InspectionListTableHead = ({ pageSize,handleExport, setPageSize }: {
  pageSize: number,
  handleExport: ()=>void;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
      <div className="table-head">
      <div className="row align-items-center">
        <div className="col-lg-4">
          <h3 className="mb-0">Inspections List</h3>
        </div>
        <div className="col-lg-8 table-search-col">
          <div className="head-page-action">
            <div className="page-size">
              <label>Page Size</label>
              <select className="form-control" value={pageSize} onChange={(e)=>setPageSize(parseInt(e.target.value) as number)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="export-btn ml-2">
              <button
                className="btn btn-orange"
                type="submit"
                onClick={handleExport}
              >
                <img
                  className="mr-1"
                  src="/static/images/icon-excel.png"
                  alt=""
                />
                Export to Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default InspectionListTableHead;
  