import { useState } from "react";
import { Inspection } from "../../../shared/models";

const VehicleImages = ({
  form,
  isView,
  errors,
  uploadingImageType,
  uploadingPrimatyImage,
  handleChangeImage,
}: {
  form: Inspection;
  isView: boolean;
  errors: Array<{
    [key: string]: string;
  }>;
  uploadingImageType: string;
  uploadingPrimatyImage: boolean;
  handleChangeImage: (type: string, e: any) => void;
}) => {
  const [showOther, setShowOther] = useState<boolean>(false);
  const isImagePresent = (type: string)=>(form?.vehicleInspectionImages || []).find(img=>img.type === type);
  const otherImages = (form?.vehicleInspectionImages || []).filter(img=>img.type === 'other');
  return (
    <>
      {!isView && (
        <ul className="add-car-list">
          <li>
            <h5>Front</h5>
            <div className="upload-file">
              <input
                type="file"
                id="logo-file-input"
                className="file-blank"
                onChange={(e) =>  handleChangeImage("frontImageUrl", e)}
              />
              <div className="upload-file-text">
                {form.vehicleInspectionImages && form.vehicleInspectionImages.length > 0 && isImagePresent('frontImageUrl') ? (
                  <img
                    className="rental-images"
                    src={isImagePresent('frontImageUrl')?.imageUrl || ''}
                    alt="profile"
                  />
                ) : (
                  <i className="fa fa-camera" aria-hidden="true"></i>
                )}
              </div>
              <div
                id="logo-upload-spinner"
                className="spinner-loader"
                style={{ display: "none" }}
              >
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <span style={{ color: "red", fontSize: '10px' }}>
              {errors && Array.isArray(errors)
                ? errors.map((error: any) => {
                    return error.frontImageUrl;
                  })
                : ""}
            </span>
          </li>
          <li>
            <h5>Passenger Side</h5>
            <div className="upload-file">
              <input
                type="file"
                id="logo-file-input"
                className="file-blank"
                onChange={(e) => handleChangeImage("passengerImageUrl", e)}
              />
              <div className="upload-file-text">
              {form.vehicleInspectionImages && form.vehicleInspectionImages.length > 0 && isImagePresent('passengerImageUrl') ? (
                  <img
                    className="rental-images"
                    src={isImagePresent('passengerImageUrl')?.imageUrl || ''}
                    alt="profile"
                  />
                ) : (
                  <i className="fa fa-camera" aria-hidden="true"></i>
                )}
              </div>
              <div
                id="logo-upload-spinner"
                className="spinner-loader"
                style={{ display: "none" }}
              >
                {uploadingImageType === "passengerImageUrl" &&
                uploadingPrimatyImage ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <span style={{ color: "red", fontSize: '10px' }}>
              {errors && Array.isArray(errors)
                ? errors.map((error: any) => {
                    return error.passengerImageUrl;
                  })
                : ""}
            </span>
          </li>
          <li>
            <h5>Driver Side</h5>
            <div className="upload-file">
              <input
                type="file"
                id="logo-file-input"
                className="file-blank"
                onChange={(e) => handleChangeImage("driverSideUrl", e)}
              />
              <div className="upload-file-text">
              {form.vehicleInspectionImages && form.vehicleInspectionImages.length > 0 && isImagePresent('driverSideUrl') ? (
                  <img
                    className="rental-images"
                    src={isImagePresent('driverSideUrl')?.imageUrl || ''}
                    alt="profile"
                  />
                ) : (
                  <i className="fa fa-camera" aria-hidden="true"></i>
                )}
              </div>
              <div
                id="logo-upload-spinner"
                className="spinner-loader"
                style={{ display: "none" }}
              >
                {uploadingImageType === "driverSideUrl" &&
                uploadingPrimatyImage ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <span style={{ color: "red", fontSize: '10px' }}>
              {errors && Array.isArray(errors)
                ? errors.map((error: any) => {
                    return error.driverSideUrl;
                  })
                : ""}
            </span>
          </li>
          <li>
            <h5>Rear</h5>
            <div className="upload-file">
              <input
                type="file"
                id="logo-file-input"
                className="file-blank"
                onChange={(e) => handleChangeImage("rearSideUrl", e)}
              />
              <div className="upload-file-text">
              {form.vehicleInspectionImages && form.vehicleInspectionImages.length > 0 && isImagePresent('rearSideUrl') ? (
                  <img
                    className="rental-images"
                    src={isImagePresent('rearSideUrl')?.imageUrl || ''}
                    alt="profile"
                  />
                ) : (
                  <i className="fa fa-camera" aria-hidden="true"></i>
                )}
              </div>
              <div
                id="logo-upload-spinner"
                className="spinner-loader"
                style={{ display: "none" }}
              >
                {uploadingImageType === "rearSideUrl" &&
                uploadingPrimatyImage ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <span style={{ color: "red", fontSize: '10px' }}>
              {errors && Array.isArray(errors)
                ? errors.map((error: any) => {
                    return error.rearSideUrl;
                  })
                : ""}
            </span>
          </li>
          <li>
            <h5>GAUGES</h5>
            <div className="upload-file">
              <input
                type="file"
                id="logo-file-input"
                className="file-blank"
                onChange={(e) => handleChangeImage("gaugesUrl", e)}
              />
              <div className="upload-file-text">
              {form.vehicleInspectionImages && form.vehicleInspectionImages.length > 0 && isImagePresent('gaugesUrl') ? (
                  <img
                    className="rental-images"
                    src={isImagePresent('gaugesUrl')?.imageUrl || ''}
                    alt="profile"
                  />
                ) : (
                  <i className="fa fa-camera" aria-hidden="true"></i>
                )}
              </div>
              <div
                id="logo-upload-spinner"
                className="spinner-loader"
                style={{ display: "none" }}
              >
                {uploadingImageType === "gaugesUrl" && uploadingPrimatyImage ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <span style={{ color: "red", fontSize: '10px' }}>
              {errors && Array.isArray(errors)
                ? errors.map((error: any) => {
                    return error.gaugesUrl;
                  })
                : ""}
            </span>
          </li>
          {otherImages && otherImages.map((img, index)=><li>            
            <h5>{ index === 0?  'Other' : ''}</h5>
            <div className="upload-file">
              <div className="upload-file-text">
                  <img
                    className="rental-images"
                    src={img.imageUrl || ''}
                    alt="profile"
                  />
              </div>
            </div>
          </li>)}
          <li className="add-upload-image">
            <h5>&nbsp;</h5>
            <div className="upload-file">
              <input
                  type="file"
                  id="logo-file-input"
                  className="file-blank"
                  onChange={(e) => handleChangeImage("other", e)}
              />
              <a href="#">
                <div className="upload-file">
                  <div className="upload-file-text">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
              </a>
            </div>
          </li>
        </ul>
      )}
      {isView && (
        <div className="view-car-list">
          <ul>
            <li>
              <h5>Front</h5>
              <div className="car-view-item">
                <img
                  src={isImagePresent('frontImageUrl')?.imageUrl || "/static/images/placeholder-image.png"}
                  alt=""
                />
              </div>
            </li>
            <li>
              <h5>Passenger Side</h5>
              <div className="car-view-item">
                <img
                  src={isImagePresent('passengerImageUrl')?.imageUrl || "/static/images/placeholder-image.png"}
                  alt=""
                />
              </div>
            </li>
            <li>
              <h5>Driver Side</h5>
              <div className="car-view-item">
                <img
                  src={isImagePresent('driverSideUrl')?.imageUrl || "/static/images/placeholder-image.png"}
                  alt=""
                />
              </div>
            </li>
            <li>
              <h5>Rear</h5>
              <div className="car-view-item">
                <img
                  src={isImagePresent('rearSideUrl')?.imageUrl || "/static/images/placeholder-image.png"}
                  alt=""
                />
              </div>
            </li>
            <li>
              <h5>Gauges</h5>
              <div className="car-view-item">
                <img
                  src={isImagePresent('gaugesUrl')?.imageUrl || "/static/images/placeholder-image.png"}
                  alt=""
                />
              </div>
            </li>
          </ul>
          {showOther && <>
            <h5>Other</h5>
            <ul>
            {otherImages && otherImages.length > 0 && otherImages.map((images)=>(<li>
              <div className="car-view-item">
                <img
                  src={images?.imageUrl || "/static/images/placeholder-image.png"}
                  alt=""
                />
              </div>
            </li>))}
          </ul>
          </>}
          {otherImages && otherImages.length > 0 && <div className="view-more-car-action">
            <button className="btn btn-orange" onClick={()=>setShowOther(!showOther)} type="submit">
              {showOther ? 'Hide More' : 'View More'}
            </button>
          </div>}
        </div>
      )}
    </>
  );
};

export default VehicleImages;
