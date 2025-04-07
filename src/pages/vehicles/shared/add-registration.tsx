import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../../Api';
import { VehicleDocumentsInterface } from '../interface';
import { useDispatch } from 'react-redux';
import { ResponseError, ResponseSuccess } from '../../../store/shared/model';
import { UpdateVehicleDocuments } from '../../../store/vehicles/models';


const VehicleRegisterDocumentsUpload = ({vehicle, handleClose}: VehicleDocumentsInterface) => {
    const [registrationURL, setRegistrationURL] = useState<any>(null)
    const [uploadingRegistration, setUploadingRegistration] = useState<boolean>(false);
    const dispatch = useDispatch()

    useEffect(() => {
        setRegistrationURL(vehicle?.registrationDocument)
    }, [vehicle?.registrationDocument])
    const handleChangeImage = async (event: any, type: string) => {
        if(event.target.files) {
          if(type === 'registration')  
            setUploadingRegistration(true)
          const fd = new FormData();
          fd.append('type', `vehicles/${type}`)
          fd.append('image', event.target.files[0])
          try {
            const response = await axios.post("/api/v1/upload-image", fd , {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            if(type === 'registration')  
                setRegistrationURL(response.data.data)

            setUploadingRegistration(false)
          } catch(err: any) {
            console.log(err.message)
          }
        }
    };

    const handleSaveDocuments = async () => {
        try {
            const imageSaved = await saveDocument()
            if(imageSaved){
                handleClose && handleClose();
                dispatch(new ResponseSuccess("Successfully upload document").action())
            } 
        } catch(err: any) {
            console.log(err.message)
        }
    }

    const saveDocument = async () => {
        let updatedVehicle = {}
        let addedImages = {}
        if((!registrationURL)) {
            dispatch(new ResponseError("No Documents Uploaded").action())
            return false
        }
        if(registrationURL && vehicle?.id){
            updatedVehicle = await axios.put(`/api/v1/vehicles/update/${vehicle.id}`, {
                registrationDocument: registrationURL
            })
        }
        const data = Promise.all([updatedVehicle, addedImages])
        if(await data && vehicle?.id) 
            dispatch(new UpdateVehicleDocuments(registrationURL, vehicle?.id).action())
        return data
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12 vehicle-document">
                    <div className="vehicle-upload mb20">
                        <div
                        className="upload-file"
                        >
                        <input
                            type="file"
                            id="logo-file-input"
                            className="file-blank"
                            onChange={(e) => handleChangeImage(e, 'registration')}
                        />
                        <div
                            style={{ display: uploadingRegistration ? "flex" : "none" }}
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
                            registrationURL || vehicle?.registrationDocument ? 
                            <div className="image-container">
                                {
                                    registrationURL && registrationURL.indexOf(".pdf") !== -1 ? 
                                    <embed src={registrationURL} width="188px" height="140px" />
                                    :
                                    <img className="vehicle-image mr-1" src={registrationURL} alt="profile" />
                                }
                            </div>
                            :
                            <h3>
                                <i
                                className="fa fa-plus mr-1"
                                aria-hidden="true"
                                ></i>
                                Registration Document
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
                        onClick={handleSaveDocuments}
                    >
                        Save
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VehicleRegisterDocumentsUpload