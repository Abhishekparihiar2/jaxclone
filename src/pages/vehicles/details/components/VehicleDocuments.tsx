import { useState } from 'react'
import { useDispatch } from 'react-redux';
import JAXModal from '../../../../shared/components/modal/jax-modal'
import { deleteVehicleDoc } from '../../../../store/vehicles/action';
import { VehicleDocumentsInterface } from '../../interface'
import VehicleDocumentsUpload from '../../shared/add-documents';
import VehicleRegisterDocumentsUpload from '../../shared/add-registration';

const VehicleDocuments = ({vehicle}: VehicleDocumentsInterface) => {
    const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false)
    const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(false)
    const dispatch = useDispatch()
    console.log(vehicle?.registrationDocument)
    return (
        <section className="card mb20 remaining-time">
            <header className="card-header">
                <h2 className="card-title">Documents</h2>
                <div className="card-head-actions">
                    {/* eslint-disable-next-line  */}
                    <a className="btn orange-circle radius-sm" href="#" onClick={() => setShowDocumentModal(true)}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                </div>
            </header>
            <div className="card-body">
                <ul className="list-style-none doc-list">
                    <li>
                    <div className="doc-name">
                        <i
                        className="fa fa-address-card-o mr-2"
                        aria-hidden="true"
                        ></i>
                        Registration
                    </div>
                    <div className="doc-action">
                        {
                            vehicle?.registrationDocument ? 
                            /* eslint-disable-next-line  */
                            <>
                                <a
                                href={vehicle?.registrationDocument}
                                className="btn btn-outline-success btn-xs mr-1"
                                target={"_blank"} rel="noreferrer"
                                >
                                <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                ></i>
                                </a>
                                <a
                                href="javascipt:void(0);"
                                className="btn btn-outline-success btn-xs mr-1"
                                onClick={() => setShowRegistrationModal(true)}
                                >
                                <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                ></i>
                                </a>
                            </> :
                        /* eslint-disable-next-line  */
                        <a
                                href="javascipt:void(0);"
                                className="btn btn-outline-success btn-xs mr-1"
                                onClick={() => setShowRegistrationModal(true)}
                                >
                                <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                ></i>
                                </a>
                        }
                    </div>
                    </li>
                    {
                        vehicle?.vehicleDocuments && vehicle?.vehicleDocuments.map((document) => <li>
                            <div className="doc-name">
                                <i
                                className="fa fa-address-card-o mr-2"
                                aria-hidden="true"
                                ></i>
                                {document?.name}
                            </div>
                            <div className="doc-action">
                                <a
                                href={document.url}
                                className="btn btn-outline-success btn-xs mr-1"
                                title="Download Document"
                                target={"_blank"}
                                rel="noreferrer"
                                >
                                <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                ></i>
                                </a>
                                <a
                                    href="javascript:void(0);"
                                    className="btn btn-outline-danger btn-xs mr-1"
                                    onClick={() => dispatch(deleteVehicleDoc({
                                        id: document.id, vehicleId: vehicle.id
                                    }))}
                                >
                                <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                ></i>
                                </a>
                                
                            </div>
                        </li>)
                    }
                </ul>
            </div>
            <JAXModal
                heading={`Add Documents`} 
                show={ showDocumentModal } 
                dialogClassName="single-upload-modal"
                handleClose={() => setShowDocumentModal(false)}
            >
                <VehicleDocumentsUpload vehicle={vehicle} handleClose={() => setShowDocumentModal(false)} />
            </JAXModal>

            <JAXModal
                heading={`Add/Edit Registration`} 
                show={ showRegistrationModal } 
                dialogClassName="single-upload-modal"
                handleClose={() => setShowRegistrationModal(false)}
            >
                <VehicleRegisterDocumentsUpload vehicle={vehicle} handleClose={() => setShowRegistrationModal(false)} />
            </JAXModal>
        </section>
    )
}

export default VehicleDocuments