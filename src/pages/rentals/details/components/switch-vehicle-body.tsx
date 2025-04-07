import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "../../../../Api";
import { formatDate } from "../../../../utils/index";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ResponseError } from "../../../../store/shared/model";

interface VehicleList {
  id: number;
  make: string;
  model: string;
  year: string;
  number: string;
}

const SwitchVehicleBody = () => {
  const [list, setList] = useState<VehicleList[]>([]);
  const [options, setOptions] = useState<VehicleList[]>([]);
  const [search, setSearch] = useState<string>("");
  const [vehicle, setVehicle] = useState<VehicleList | null>(null);
  const { rentalID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const getVehiclesList = async () => {
      const vehicles = await axios.get("/api/v1/vehicles/available");
      if (vehicles && vehicles.data.data.length) setList(vehicles.data.data);
    };
    getVehiclesList();
  }, []);

  useEffect(() => {
    if (list && list.length) {
      console.log(search, list);
      if (search && search.length > 0) {
        const filteredOptions = list.filter((vehicle) =>
          `${vehicle.number}-${vehicle.model} ${vehicle.make} ${formatDate(
            new Date(vehicle.year),
            true
          )}`
            .toLowerCase()
            .includes(search.toLowerCase())
        );
        setOptions(filteredOptions);
      } else {
        setOptions(list);
      }
    }
  }, [list, search]);

  const onChangeHandle = async (id: number) => {
    const vehicleData = list.find((vehicle) => vehicle.id === id);
    if (vehicleData) {
      setVehicle(vehicleData);
      setSearch(`${vehicleData.model} ${vehicleData.make} ${formatDate(
        new Date(vehicleData.year),
        true
      )} ${vehicleData.number}`)
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!vehicle) {
      dispatch(new ResponseError("Please select new vehicle!").action());
      return false;
    }
    try {
      const switchData = await axios.post(
        `/api/v1/bookings/${rentalID}/switch`,
        {
          vehicleId: vehicle.id,
        }
      );
      navigate(
        `/add-inspection/?newVehicleId=${vehicle.id}&rentalId=${rentalID}&initialVehicle=${switchData.data.data.initialVehicleId}&type=2&switch=open&switchId=${switchData.data.data.id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="vehicle-upload mb20">Select New Vehicle</label>
        <div className="row">
          <div className="col-md-12">
            <div className="row  mb20">
              <div className="col-md-4">
                <div className="form-group vehicle-dropdown">
                <label>Vehicle Details</label>
                <Dropdown>
                  <div className="dropdown-btn-container">
                    <Dropdown.Toggle
                      bsPrefix={"dropdown-toggle vehicle-search-button"}
                      id="dropdown-basic"
                    >
                      
                        <div className={"align-items-center button-container"}>
                          <React.Fragment>
                            <input
                              className={"input-field form-control"}
                              type={"text"}
                              onChange={(e) => setSearch(e.target.value)}
                              name="search"
                              placeholder={"Provide vehicle name"}
                              autoComplete="off"
                              value={
                                search
                              }
                            />
                          </React.Fragment>
                        </div>
                      
                    </Dropdown.Toggle>
                  </div>
                  <Dropdown.Menu bsPrefix={"dropdown-menu"}>
                    {options.map((item) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => onChangeHandle(item.id)}
                      >
                        {`${item.number}-${item.model} ${item.make} ${formatDate(
                          new Date(item.year),
                          true
                        )}`}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                </div>
              </div>
              {/* <div className="col-md-4">
                <div className="form-group">
                  <label>Vehicle Name</label>
                  <input type="text" className="form-control" placeholder="2019 Hundai Sonata GLS"/>
                </div>
              </div> */}
              <div className="col-md-4">
                <div className="form-action mb-2">
                  <label className="label-blank label-blank-mobile-hide">&nbsp;</label>
                  <button
                    className="btn btn-orange"
                    // onClick={handleSaveImages}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </form>
    </>
  );
};

export default SwitchVehicleBody;
