import React, { useEffect, useLayoutEffect, useState } from 'react'
import { VehicleImagesInterface } from '../interface'
import Api from "../../../Api";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../../store';
import { Vehicle } from '../../../store/vehicles/interface';
import { ResponseError, ResponseReset, ResponseSuccess } from '../../../store/shared/model';
import { UpdateVehicleImages, UpdateVehiclePrimaryImages } from '../../../store/vehicles/models';

export interface ImagesInterface {
    id?: number;
    url?: string;
}

export interface VehicleExtraImagesInterface {
    id?: number;
    loading?: boolean;
}

const VehicleImages = ({
    newVehicleId,
    handleClose
}: VehicleImagesInterface) => {

    const [primaryImageUrl, setPrimaryImageUrl] = useState<any>(null)
    const [vehicleImages, setVehicleImages] = useState<ImagesInterface [] | null | undefined>(null);
    const [uploadingPrimatyImage, setUploadingPrimaryImage] = useState<boolean>(false);
    const [uploadingVehicleImages, setUploadingVehicleImages] = useState<VehicleExtraImagesInterface[] | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle>();

    const pageInfo = useSelector((state: StoreInterface) => state.vehiclesPage);
    const dispatch = useDispatch()

    const navigate = useNavigate();

    useLayoutEffect(() => {
        const imagesArray = [{}]
        const filteredVehicle = pageInfo.vehiclesList && pageInfo.vehiclesList.find((vehicle) => vehicle.id === newVehicleId)
        if(filteredVehicle){
            setVehicle(filteredVehicle)
        }
        setVehicleImages( imagesArray )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setPrimaryImageUrl(vehicle?.primaryImageUrl)
        const images = vehicle?.images?.map((image) => ({url: image.url, id: image.id}))
        images && images.length > 0 && images.forEach((image, index) => {
            if(image.url === undefined && image.id === undefined) {
                images.splice(index)
            }
        })
        if(images && images.length > 0) 
            setVehicleImages([...images, {} ])
    }, [vehicle])


    const handleChangeImage = async (event: any) => {
        if(event.target.files) {
          setUploadingPrimaryImage(true)
          const fd = new FormData();
          fd.append('type', `vehicles/primary`)
          fd.append('image', event.target.files[0])
          try {
            const response = await Api.post("/api/v1/upload-image", fd , {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            setPrimaryImageUrl(response.data.data)
            setUploadingPrimaryImage(false)
          } catch(err: any) {
            console.log(err.message)
          }
        }
    };
    const handleVehicleImage = async (event: any, index: number) => {
        if(event.target.files) {
          const imageArray = vehicleImages
          const uploadingExtraVehiclesArray = uploadingVehicleImages ? [...uploadingVehicleImages, {id: index, loading: true}] : [{id: index, loading: true}]
          setUploadingVehicleImages(uploadingExtraVehiclesArray)
          const fd = new FormData();
          fd.append('type', `vehicles/others`)
          fd.append('image', event.target.files[0])
          try {
            const response = await Api.post("/api/v1/upload-image", fd , {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }) 
            if(imageArray) {
              imageArray[index].url = response.data.data;
              if(imageArray[index].id || index < (imageArray.length - 1))
                setVehicleImages([...imageArray])
              else
                setVehicleImages([...imageArray, {}])
            }
            const updateUploadingExtraVehiclesArray = uploadingExtraVehiclesArray.map((uploadedImage) => uploadedImage.id === index ? {...uploadedImage, loading: false} : {...uploadedImage})
            setUploadingVehicleImages(updateUploadingExtraVehiclesArray)
          } catch(err: any) {
            console.log(err.message)
          }
        }
    }
    
    const saveImages = async () => {
        let updatedVehicle = {}
        let addUpdateImages = {}
        if((!primaryImageUrl || !vehicleImages) && !newVehicleId) {
            dispatch(new ResponseError("No Images Uploaded or no new vehicle created").action())
            return false
        }
        await dispatch(new ResponseReset().action())
        if(primaryImageUrl && newVehicleId){
            updatedVehicle = await Api.put(`/api/v1/vehicles/update/${newVehicleId}`, {
                primaryImageUrl
            })
            if(newVehicleId)
                dispatch(new UpdateVehiclePrimaryImages(primaryImageUrl, newVehicleId).action())
        }
        if(vehicleImages && newVehicleId) {
            await vehicleImages?.map(async (image) => {
            if(image.url && image.url.length > 0){
                if(image.id) {
                    addUpdateImages = await Api.put(`/api/v1/vehicle-images/update/${image.id}`, {
                        url : image.url,
                        vehicleId : newVehicleId
                    })
                } else {
                    addUpdateImages = await Api.post(`/api/v1/vehicle-images/add/${newVehicleId}`, {
                        url : image.url,
                        isPrimary : 0
                    })
                }
            }
            })
        }
        // eslint-disable-next-line no-restricted-globals
        if(newVehicleId)
            dispatch(new UpdateVehicleImages(vehicleImages, newVehicleId).action())
        const data = Promise.all([updatedVehicle, addUpdateImages])
        // eslint-disable-next-line no-restricted-globals
        if(location.pathname === '/add-vehicles')
            navigate(`/vehicles`);

        // eslint-disable-next-line no-restricted-globals    
        if(location.pathname === `/vehicle-detail/${newVehicleId}` && handleClose)
            handleClose()    

        return data
    }
    
    const handleSaveImages = async () => {
        try {
            const imageSaved = await saveImages()
            if(imageSaved){
                await dispatch(new ResponseSuccess("Uploaded Successfully").action())
                return true
            } 
        } catch(err: any) {
            console.log(err.message)
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="vehicle-upload mb20">
                        <div
                        className="upload-file"
                        style={{ height: "220px" }}
                        >
                        <input
                            type="file"
                            id="logo-file-input"
                            className="file-blank"
                            onChange={(e) => handleChangeImage(e)}
                        />
                        <div
                            style={{ display: uploadingPrimatyImage ? "flex" : "none" }}
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
                            primaryImageUrl ? 
                            <div className="image-container">
                                <img className="vehicle-image mr-1" src={primaryImageUrl} alt="profile" />
                            </div>
                            :
                            <h3>
                                <i
                                className="fa fa-plus mr-1"
                                aria-hidden="true"
                                ></i>
                                Main
                            </h3>
                            }
                        </div>
                        </div>
                    </div>
                </div>
                {
                    vehicleImages?.length && vehicleImages.map((image, index) => (
                        <div className="col-md-6">
                            <div className="vehicle-upload mb20">
                                <div
                                className="upload-file"
                                style={{ height: "220px" }}
                                >
                                <input
                                    type="file"
                                    id="logo-file-input"
                                    className="file-blank"
                                    onChange={(e) => handleVehicleImage(e, index)}
                                />
                                {
                                    uploadingVehicleImages?.map((uploadData) => (
                                        <div
                                            style={{ display: uploadData.id === index && uploadData.loading ?  "flex" : "none" }}
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
                                    ))
                                }
                                <div className="upload-file-text">
                                    {
                                    image && image.url && image.url?.length > 0 ? 
                                    <div className="image-container">
                                        <img className="vehicle-image mr-1" src={image.url} alt="profile" />
                                    </div>
                                    :
                                    <h3>
                                        <i
                                        className="fa fa-plus mr-1"
                                        aria-hidden="true"
                                        ></i>
                                    </h3>
                                    }
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
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

export default VehicleImages