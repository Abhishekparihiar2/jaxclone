import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../shared/components/layout/layout";
import { CustomSettingExportHeader } from "../../shared/models";
import { RootState } from "../../store";
import { fetchCustomSettings } from "../../store/customSetting/action";
import { CustomSetting, CustomSettingPage } from "../../store/customSetting/models";
import { exportData } from "../../utils";
import CustomSettingPagination from "./components/custom-setting-pagination";
import CustomSettingTable from "./components/custom-setting-table";
import CustomSettingTableHead from "./components/custom-setting-table-head";
import JAXModal from "../../shared/components/modal/jax-modal";
import AddCustomSetting from "./components/custom-setting-add";

const CustomerSetting = () => {
  const dispatch = useDispatch();
  const [sortOrder, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const[addVehicleType, setAddVehicleType] = useState(false)
  const handleExport = async () => {
    let ids: number[] = []
    pageInfo?.customSettings && pageInfo?.customSettings.map((setting: CustomSetting) => setting.id ? ids.push(Number(setting.id)) : "")
    try {
      const response = await axios.post('/api/v1/export/settings', {
        ids,
        pageSize,
        pageNumber
      })
      exportData(
        response.data.data,
        "Custom Settings-" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
        CustomSettingExportHeader
      );
    } catch (err) {

    }
  };

  useEffect(() => {
    searchSettings(pageNumber, pageSize);
    // eslint-disable-next-line
  }, [sortBy, sortOrder]);

  const searchSettings = (page: number = pageNumber, size: number = pageSize) => {
    dispatch(fetchCustomSettings(size, page, { sortBy, sortOrder }));
  };

  useEffect(() => {
    dispatch(fetchCustomSettings(pageSize, pageNumber, { sortBy, sortOrder }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    searchSettings(0, pageSize);
    // eslint-disable-next-line
  }, [pageSize]);

  const changePage = (page_no: number) => {
    setPageNumber(page_no);
    searchSettings(page_no, pageSize);
  };

  const pageInfo: CustomSettingPage = useSelector(
    (state: RootState) => state.customSettings
  );

  return (
    <>
      <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Pricing</h2>
            </div>
            <div className="card-head-actions-left add-vehicle-type">
                <a className="btn btn-orange btn-sm" href="javascript:void(0);" onClick={() => setAddVehicleType(true)}>
                  <i className="fa fa-plus mr-1" aria-hidden="true"></i>
                  Add Vehicle Type
                </a>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <section className="card mb20">
                <div className="card-body pb-0">
                  <CustomSettingTableHead handleExport={handleExport} pageSize={pageSize} setPageSize={setPageSize} />
                  <CustomSettingTable setSortBy={setSortBy} sortBy={sortBy} sortType={sortOrder} setSortType={setSortType} customSettings={pageInfo.customSettings} searchSettings={searchSettings} />
                </div>
              </section>
              <CustomSettingPagination count={pageInfo.count} pageSize={pageSize} pageNumber={pageNumber} changePage={changePage} />
            </div>
          </div>
        </section>
      </Layout>

      {/* View Revenue Modal Start */}
      <div
        className="modal fade view-revenue-modal"
        id="viewRevenueModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-xxl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Revenue</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="info-list info-list2-col">
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Customer Name</label>
                    <div className="info-name">John Smith</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Vehicle Number</label>
                    <div className="info-name">V123456</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Rental Start Date</label>
                    <div className="info-name">Jan 12, 2022</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Rental End Date</label>
                    <div className="info-name">Jan 14, 2022</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Daily Rate X 2 Days</label>
                    <div className="info-name">07/12/1996</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Jax Maintenance Plan</label>
                    <div className="info-name">$15.00</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Jax Protection Plan</label>
                    <div className="info-name">$10.00</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Insurance Plan</label>
                    <div className="info-name">$15.00</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Under 25 Surcharge</label>
                    <div className="info-name">$15.00</div>
                  </div>
                </li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label">Tax</label>
                    <div className="info-name">$12.00</div>
                  </div>
                </li>
              </ul>

              <ul className="info-list info-list2-col">
                <li className="blank-li">&nbsp;</li>
                <li>
                  <div className="info-list-item">
                    <label className="info-label total-text">Total</label>
                    <div className="info-name total-value">$20.00</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <JAXModal
        heading={'Add Vehicle Type'}
        show={addVehicleType}
        handleClose={ () => setAddVehicleType(false) }
        bodyClassName="modal-body-scroll"
        backdrop="static"
      >
        <AddCustomSetting handleClose={ () => setAddVehicleType(false) }/>
      </JAXModal>
    </>
  );
};

export default CustomerSetting;
