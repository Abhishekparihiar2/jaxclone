import { useEffect, useLayoutEffect, useState } from 'react'
import { CustomerDocumentInterface } from '../interface'
import Api from "../../../Api";
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../../store';
import { ResponseError, ResponseReset, ResponseSuccess } from '../../../store/shared/model';
import { User, UpdateUserDocuments, AddCustomerDocuments } from '../../../store/customers/model';

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
    customerId,
    handleClose
}: CustomerDocumentInterface) => {

    const [frontImageUrl, setFrontImageUrl] = useState<any>(null)
    const [backImageUrl, setBackImageUrl] = useState<any>(null)
    const [, setImageURL] = useState('');
    const [customerDocuments, setCustomerDocuments] = useState<DocumentInterface [] | null | undefined>(null);
    const [uploadingExtraVehicleImages,] = useState<LoaderDocumentInterface[]>([]);
    const [customer, setCustomer] = useState<User>();

    const pageInfo = useSelector((state: StoreInterface) => state.customerDetailsPage);
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if(pageInfo.customer)
            setCustomer(pageInfo.customer)

        const imagesArray = [{}]
        setCustomerDocuments(imagesArray)
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setFrontImageUrl(customer?.driverLicenseDetail?.frontImageUrl)
        setBackImageUrl(customer?.driverLicenseDetail?.backImageUrl)
        // const documents = customer?.userDocuments?.map((document) => ({url: document.url, id: document.id, name: document.name}))
        // documents && documents.length > 0 && documents.forEach((document: any, index) => {
        //     if(document.url === undefined && document.id === undefined) {
        //         documents.splice(index)
        //     }
        // })
        // if(documents && documents.length > 0) 
        //     setCustomerDocuments([...documents, {} ])
    }, [customer])


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
          const documentArray = customerDocuments
        //   setUploadingExtraVehicleImages(true)
          setImageURL(URL.createObjectURL(event.target.files[0]));
          const fd = new FormData();
          fd.append('type', 'customer/documents')
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
                setCustomerDocuments([...documentArray])
              else
              setCustomerDocuments([...documentArray, {}])
            }
            // setUploadingExtraVehicleImages(false)
          } catch(err: any) {
            console.log(err.message)
          }
        }
    }

    const handleDocumentName = (e: any, index: number) => {
        const documentArray = customerDocuments
        if(documentArray) {
            documentArray[index].name = e.target.value;
            documentArray[index].nameError = ""
          if(documentArray[index].id || index < (documentArray.length - 1) || !documentArray[index].url) {
            setCustomerDocuments([...documentArray])
          }else{
            setCustomerDocuments([...documentArray, {}])
          }
        }
    }
    
    const validate = () => {
        let errorStatus = false
        const documentArray = customerDocuments
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
        setCustomerDocuments(updatedArray)
        return errorStatus
    }

    const saveImages = async () => {
        let addUpdateDocuments: any = [];
        let newDocuments: any = [];
        // let documents = null;
        if((!frontImageUrl || !backImageUrl) && !customerId) {
            dispatch(new ResponseError("No Documents Uploaded!").action())
            return false
        }
        await dispatch(new ResponseReset().action())
        if(frontImageUrl && backImageUrl){
            await Api.put(`/api/v1/update/license/${customerId}`, {
                frontImageUrl,
                backImageUrl
            })
            if(customerId)
                dispatch(new UpdateUserDocuments({frontImageUrl, backImageUrl}, customer).action())
        }
        if(customer && customer?.id && customerDocuments) {
            if(customerDocuments.length === 1 && Object.keys(customerDocuments[customerDocuments.length - 1]).length === 0) {
                return false
            }
            await (
                Promise.all(
                    customerDocuments.map(async (document) => {
                        if(document.url && document.url.length > 0){
                            if(document.id) {
                                if(document.url) {
                                    const response = await Api.put(`/api/v1/update/documents/${document.id}`, {
                                        url : document.url,
                                        userId : customerId,
                                        name: document.name
                                    })
                                    return addUpdateDocuments.push(response.data.data)
                                }
                            } else {
                                if(document.url) {
                                    const response = await Api.post(`/api/v1/add/documents`, {
                                        url : document.url,
                                        userId : customerId,
                                        name: document.name
                                    })
                                    return newDocuments.push(response.data.data)
                                }
                            }
                        }
                    })
                )
            )
            if(customerId && newDocuments)
                dispatch(new AddCustomerDocuments(newDocuments, customer).action())    
        }

        //eslint-disable-next-line no-restricted-globals    
        if(location.pathname === `/customer-info/${customerId}` && handleClose)
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
                {/* <div className="col-md-6">
                    <div className="vehicle-upload mb20">
                        <div
                        className="upload-file"
                        style={{ height: "220px" }}
                        >
                        <input
                            type="file"
                            id="logo-file-input"
                            className="file-blank"
                            name="front"
                            onChange={(e) => handleChangeImage(e)}
                        />
                        <div
                            style={{ display: uploadingFrontImage ? "flex" : "none" }}
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
                            frontImageUrl ? 
                            <div className="image-container">
                                {
                                    frontImageUrl.indexOf(".pdf") != -1 ? 
                                    <embed src={frontImageUrl} width="180px" height="221px" />
                                    :
                                    <img className="vehicle-image mr-1" src={frontImageUrl} alt="profile" />
                                }
                            </div>
                            :
                            <h3>
                                <i
                                className="fa fa-plus mr-1"
                                aria-hidden="true"
                                ></i>
                                Front Image
                            </h3>
                            }
                        </div>
                        </div>
                    </div>
                </div>
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
                            name="back"
                            onChange={(e) => handleChangeImage(e)}
                        />
                        <div
                            style={{ display: uploadingBackImage ? "flex" : "none" }}
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
                            frontImageUrl ? 
                            <div className="image-container">
                                {
                                    backImageUrl.indexOf(".pdf") != -1 ? 
                                    <embed src={backImageUrl} width="180px" height="221px" />
                                    :
                                    <img className="vehicle-image mr-1" src={backImageUrl} alt="profile" />
                                }
                            </div>
                            :
                            <h3>
                                <i
                                className="fa fa-plus mr-1"
                                aria-hidden="true"
                                ></i>
                                Back Image
                            </h3>
                            }
                        </div>
                        </div>
                    </div>
                </div> */}
                {
                    customerDocuments?.length && customerDocuments.map((document, index) => (
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