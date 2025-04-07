import { useEffect, useLayoutEffect, useState } from 'react'
// import { CustomerDocumentInterface } from '../interface'
import Api from "../../../Api";
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../../store';
import { ResponseError, ResponseReset, ResponseSuccess } from '../../../store/shared/model';
import { User, UpdateUserDocuments, AddCustomerDocuments } from '../../../store/customers/model';
import { AddVehicleDocuments, UpdateVehicleDocuments } from '../../../store/vehicles/models';

export interface DocumentInterface {
    id?: number;
    url?: string;
    name?: string;
    nameError?: string;
    urlError?: string;
}

export interface LoaderDocumentInterface {
    id?: number;
    loader?: boolean;
}

const AddDocuments = ({
    vehicle,
    handleClose
}: any) => {

    const [registrationURL, setRegistrationURL] = useState<any>(null)
    const [uploadingRegistration, setUploadingRegistration] = useState<boolean>(false);
    const [, setImageURL] = useState('');
    const [vehiclesDocuments, setVehiclesDocuments] = useState<DocumentInterface [] | null | undefined>(null);
    const [uploadingExtraVehicleImages,] = useState<LoaderDocumentInterface[]>([]);
    const [customer, setCustomer] = useState<User>();

    const pageInfo = useSelector((state: StoreInterface) => state.customerDetailsPage);
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if(pageInfo.customer)
            setCustomer(pageInfo.customer)

        const imagesArray = [{}]
        setVehiclesDocuments(imagesArray)
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setRegistrationURL(vehicle?.registrationDocument)
    }, [vehicle?.registrationDocument])


    // const handleChangeImage = async (event: any) => {
    //     if(event.target.files) {
    //         if(event.target.name === 'front')
    //             setUploadingFrontImage(true)
    //         if(event.target.name === 'back')
    //             setUploadingBackImage(true)
    //       setImageURL(URL.createObjectURL(event.target.files[0]));
    //       const fd = new FormData();
    //       fd.append('image', event.target.files[0])
    //       try {
    //         const response = await Api.post("/api/v1/upload-image", fd , {
    //           headers: {
    //             'Content-Type': 'multipart/form-data'
    //           }
    //         })
    //         if(event.target.name === 'front')
    //             setFrontImageUrl(response.data.data)
    //         if(event.target.name === 'back')
    //             setBackImageUrl(response.data.data)    
    //         setUploadingFrontImage(false)
    //         setUploadingBackImage(false)
    //       } catch(err: any) {
    //         console.log(err.message)
    //       }
    //     }
    // };
    const handleDocumentsImage = async (event: any, index: number) => {
        if(event.target.files) {
          const documentArray = vehiclesDocuments
        //   setUploadingExtraVehicleImages(true)
          setImageURL(URL.createObjectURL(event.target.files[0]));
          const fd = new FormData();
          fd.append('type', 'vehicles/documents')
          fd.append('image', event.target.files[0])
          try {
            const response = await Api.post("/api/v1/upload-image", fd , {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }) 
            if(documentArray) {
                documentArray[index].url = response.data.data;
              if(documentArray[index].id || index < (documentArray.length - 1))
                setVehiclesDocuments([...documentArray])
              else
                setVehiclesDocuments([...documentArray, {}])
            }
            // setUploadingExtraVehicleImages(false)
          } catch(err: any) {
            console.log(err.message)
          }
        }
    }

    const handleDocumentName = (e: any, index: number) => {
        const documentArray = vehiclesDocuments
        if(documentArray) {
            documentArray[index].name = e.target.value;
            documentArray[index].nameError = ""
          if(documentArray[index].id || index < (documentArray.length - 1) || !documentArray[index].url) {
            setVehiclesDocuments([...documentArray])
          }else{
            setVehiclesDocuments([...documentArray, {}])
          }
        }
    }
    
    const validate = () => {
        let errorStatus = false
        const documentArray = vehiclesDocuments
        let nameError:string;
        let urlError:string;
        const updatedArray = documentArray?.map((data) => {
            nameError = ""
            if(data.url && (!data.name || data.name.length === 0)){
                errorStatus = true
                nameError = "Please provide name for the document"
            }
            return {...data, nameError, urlError}
        })
        setVehiclesDocuments(updatedArray)
        return errorStatus
    }

    const saveImages = async () => {
        let addUpdateDocuments: any = [];
        let newDocuments: any = [];
        console.log(vehiclesDocuments)
        console.log(vehicle)
        if(vehicle && vehicle?.id && vehiclesDocuments) {
            if(vehiclesDocuments.length === 1 && Object.keys(vehiclesDocuments[vehiclesDocuments.length - 1]).length === 0) {
                return false
            }
            await (
                Promise.all(
                    vehiclesDocuments.map(async (document) => {
                        if(document.url && document.url.length > 0){
                            if(document.id) {
                                if(document.url) {
                                    const response = await Api.put(`/api/v1/update/documents/${document.id}`, {
                                        url : document.url,
                                        userId : vehicle.id,
                                        name: document.name
                                    })
                                    return addUpdateDocuments.push(response.data.data)
                                }
                            } else {
                                if(document.url) {
                                    const response = await Api.post(`/api/v1/vehicle-documents/create`, {
                                        url : document.url,
                                        vehicleId : vehicle.id,
                                        name: document.name,
                                        isRegistrationDocument: 0
                                    })
                                    console.log(response.data)
                                    return newDocuments.push({
                                        url : document.url,
                                        vehicleId : vehicle.id,
                                        name: document.name,
                                        isRegistrationDocument: 0,
                                        id: response.data.data.insertId
                                    })
                                }
                            }
                        }
                    })
                )
            )
            console.log(newDocuments)
            if(vehicle.id && newDocuments)
                dispatch(new AddVehicleDocuments(newDocuments, vehicle?.id).action())    
        }

        //eslint-disable-next-line no-restricted-globals    
        if(location.pathname === `/vehicle-detail/${vehicle.id}` && handleClose)
            handleClose()    

        // return data
        return true
    }
    
    const handleSaveImages = async () => {
        try {
            const inValidateDocuments = validate();
            if(inValidateDocuments)
                return false
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
                {
                    vehiclesDocuments?.length && vehiclesDocuments.map((document, index) => (
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
                                        onChange={(e) => handleDocumentsImage(e, index)}
                                    />
                                    <div
                                        style={{ display: uploadingExtraVehicleImages ? "none" : "none" }}
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
                                        document && document.url && document.url?.length > 0 ? 
                                        <div className="image-container">
                                            {
                                                document.url.indexOf(".pdf") !== -1 ? 
                                                <embed src={document.url} width="180px" height="221px" />
                                                :
                                                <img className="vehicle-image mr-1" src={document.url} alt="profile" />
                                            }
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
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { document.urlError && document.urlError.length > 0
                                        ? document.urlError
                                        : "" }
                                    </span>
                                </div>
                                <div>
                                    <input type="text" className='form-control' name="name" value={document.name} onChange={(e) => handleDocumentName(e, index)} />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { document.nameError && document.nameError.length > 0
                                        ? document.nameError
                                        : "" }
                                    </span>
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

export default AddDocuments