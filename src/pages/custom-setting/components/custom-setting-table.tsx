import { useState } from "react";
import { useDispatch } from "react-redux";
import Api from "../../../Api";
import Sorter from "../../../shared/components/sorting/sorter";
import { CustomSetting } from "../../../store/customSetting/models";
import { ResponseError } from "../../../store/shared/model";

const CustomSettingTable = ({ customSettings, searchSettings, sortBy,
  sortType,
  setSortBy,
  setSortType
}: {
  customSettings: CustomSetting[], searchSettings: (page?: number, size?: number) => void, sortBy: string;
  sortType: string;
  setSortBy: any;
  setSortType: any;
}) => {
  const [editCustomSetting, setEditCustomSetting] = useState<CustomSetting>({});
  const dispatch = useDispatch();
  const [form, setForm] = useState<any>({});
  const saveSetting = ( form: CustomSetting ) =>
  {
    const reqObj = { ...form };
    if ( !reqObj.DayRate )
    {
      reqObj.DayRate = 0;
    }
    if ( !reqObj.InsurancePlan )
    {
      reqObj.InsurancePlan = 0;
    }
    if ( !reqObj.MaintenancePlan )
    {
      reqObj.MaintenancePlan = 0;
    }
    if ( !reqObj.ProtectionPlan )
    {
      reqObj.ProtectionPlan = 0;
    }
    if ( !reqObj.ProtectionPlan )
    {
      reqObj.ProtectionPlan = 0;
    }
    if (reqObj.name && reqObj.VehicleTypeId)
    {      
      Api.put(`/api/v1/custom-setting/${form.id}`, reqObj).then(d => {
        searchSettings();
        setTimeout(() => {
          setForm({});
          setEditCustomSetting({});
        }, 0);
      }).catch(e => dispatch(new ResponseError(e.data.message).action()))
    } else
    {
      dispatch(new ResponseError("Please provide all the values.").action())
      setForm( { ...reqObj } );
    }
  };
  const handleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >, resetTaskName: undefined | string | null
  ) => {
    const name = e.target.name;
    let value:any = e.target.value;
    if ( name !== 'name' && e.target.value !== '')
    {
      value = Number(e.target.value)
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="jax-table-outer ml-1rem mr-1rem">
      <div className="table-responsive jax-table">
        <table className="table mb-0 table-striped">
          <thead>
            <tr>
              <th style={{ width: "18%" }} onClick={()=>{ setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Vehicle Type
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} />
                </th>
              <th style={{ width: "11%" }} onClick={()=>{ setSortBy('DayRate'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Daily Rate
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'DayRate'} />
                </th>
              <th style={{ width: "16%" }} onClick={()=>{ setSortBy('MaintenancePlan'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Maintenance Plan
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'MaintenancePlan'} />
                </th>
              <th style={{ width: "16%" }} onClick={()=>{ setSortBy('ProtectionPlan'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Protection Plan
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'ProtectionPlan'} />
                </th>
              <th style={{ width: "16%" }} onClick={()=>{ setSortBy('InsurancePlan'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Insurance Plan
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'InsurancePlan'} />
              </th>
              <th style={{ width: "13%" }} onClick={()=>{ setSortBy('AdminFee'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Jax Admin Fee
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'AdminFee'} />
              </th>
              <th style={{ width: "13%" }}>
                Action
                </th>
            </tr>
          </thead>
          <tbody>
            {customSettings && customSettings.map((setting) =>
              editCustomSetting && setting.id && (setting.id === editCustomSetting.id) ? <tr>
                <td><input className="form-control" type={'text'}
                  placeholder=""
                  value={form.name}
                  name="name"
                  onChange={(e) => {
                    handleForm(e, undefined);
                  }}
                /></td>
                <td><input className="form-control" type={'number'}
                  placeholder=""
                  value={form.DayRate}
                  name="DayRate"
                  onChange={(e) => {
                    handleForm(e, undefined);
                  }}
                /></td>
                <td><input className="form-control" type={'number'}
                  placeholder=""
                  value={form.MaintenancePlan}
                  name="MaintenancePlan"
                  onChange={(e) => {
                    handleForm(e, undefined);
                  }}
                /></td>
                <td><input className="form-control" type={'number'}
                  placeholder=""
                  value={form.ProtectionPlan}
                  name="ProtectionPlan"
                  onChange={(e) => {
                    handleForm(e, undefined);
                  }}
                /></td>
                <td><input className="form-control" type={'number'}
                  placeholder=""
                  value={form.InsurancePlan}
                  name="InsurancePlan"
                  onChange={(e) => {
                    handleForm(e, undefined);
                  }}
                /></td>
                <td><input className="form-control" type={'number'}
                  placeholder=""
                  value={form.AdminFee}
                  name="AdminFee"
                  onChange={(e) => {
                    handleForm(e, undefined);
                  }}
                /></td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-xs mr-2"
                    title="Save"
                    onClick={() => {
                      saveSetting(form);
                    }}
                  >
                    <i
                      className="fa fa-save"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-xs"
                    title="Cancel"
                    onClick={() => {
                      setForm({});
                      setEditCustomSetting({})
                    }}
                  >
                    <i
                      className="fa fa-times"
                      aria-hidden="true"
                    ></i>
                  </button>
                </td>
              </tr> : setting.id ? <tr>
                <td>{setting.name}</td>
                <td>{setting.DayRate}</td>
                <td>{setting.MaintenancePlan}</td>
                <td>{setting.ProtectionPlan}</td>
                <td>{setting.InsurancePlan}</td>
                <td>{setting.AdminFee}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-xs"
                    title="Edit"
                    onClick={() => {
                      setForm({ ...setting });
                      setEditCustomSetting(setting)
                    }}
                  >
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                    ></i>
                  </button>
                </td>
              </tr>
                : '')}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default CustomSettingTable;
