import { useState } from 'react'
import { RentalInsuranceInterface } from '../../interfaces';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ResponseError } from '../../../../store/shared/model';

const RentalInsurance = ({
    rental,
    setEditDocuments
}: RentalInsuranceInterface) => {
    const [insuranceURL, setInsuranceURL] = useState<any>(rental?.insuranceUrl || null)
    const [uploadingInsurance, setUploadingInsurance] = useState<boolean>(false);
    const dispatch = useDispatch()

    const handleChangeImage = async (event: any, type: string) => {
        if(event.target.files) {
          if(type === 'insurance')  
            setUploadingInsurance(true)

          const fd = new FormData();
          fd.append('type', `rental/insurance`)
          fd.append('image', event.target.files[0])
          try {
            const response = await axios.post("/api/v1/upload-image", fd , {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            if(type === 'insurance')  
                setInsuranceURL(response.data.data)

            setUploadingInsurance(false)
          } catch(err: any) {
            console.log(err.message)
          }
        }
    };

    const handleSaveImages = async () => {
        try {
            await saveImages()
            // dispatch( new ResponseSuccess( "Documents updated successfully." ).action() )
            if ( setEditDocuments )
            {
                setEditDocuments( false );
            }
            window.location.reload();
        } catch(err: any) {
            console.log(err.message)
        }
    }

    const saveImages = async () => {
        let updatedVehicle = {}
        let uploadDocuments = {}
        if((!insuranceURL)) {
            dispatch(new ResponseError("No Documents Uploaded").action())
            return false
        }
        if((insuranceURL) && rental?.id) {
            uploadDocuments = await axios.post(`/api/v1/bookings/${rental.id}/upload-insurance`, {
                insuranceURL
            })
        }
        const data = Promise.all([updatedVehicle, uploadDocuments])
        return data
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="vehicle-upload mb20">
                        <div
                        className="upload-file"
                        >
                        <input
                            type="file"
                            id="logo-file-input"
                            className="file-blank"
                            onChange={(e) => handleChangeImage(e, 'insurance')}
                        />
                        <div
                            style={{ display: uploadingInsurance ? "flex" : "none" }}
                            id="logo-upload-spinner"
                            className="spinner-loader"
                        >
                            <div
                            className="spinner-border"
                            role="status"
                            >
                            <span className="sr-only">
                                Loading...
                            </span>
                            </div>
                        </div>
                        <div className="upload-file-text">
                            {
                            insuranceURL ? 
                            <div className="image-container sdss">
                                {
                                    insuranceURL.indexOf(".pdf") !== -1 ? 
                                    <embed src={insuranceURL} width="180px" height="221px" />
                                    :
                                    <img className="vehicle-image mr-1" src={insuranceURL} alt="profile" />
                                }
                            </div>
                            :
                            <h3>
                                <i
                                className="fa fa-plus mr-1"
                                aria-hidden="true"
                                ></i>
                                Insurance Document
                            </h3>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-action text-right mt-2 mb-2">
                    <button
                        className="btn btn-orange"
                        onClick={handleSaveImages}
                    >
                        Save
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RentalInsurance