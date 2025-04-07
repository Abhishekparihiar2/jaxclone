import React, {FC, useState} from "react";
import JAXModal from "../../../../shared/components/modal/jax-modal";
import { UpdateCustomerDocuments, User } from "../../../../store/customers/model";
import AddDocuments from "../../shared/add-documents";
import axios from '../../../../Api';
import { useDispatch } from "react-redux";
import { ResponseError, ResponseSuccess } from "../../../../store/shared/model";

interface CustomerDocumentsInterface
{
  customer:User
}

const CustomerDocuments: FC<CustomerDocumentsInterface> = ( props: CustomerDocumentsInterface ) =>
{
  
  const { customer } = props
  const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const hanleDeleteDocument = async (id: number) => {
    try {
      const response = await axios.delete(`/api/v1/user/documents/delete/${id}`)
      dispatch(new ResponseSuccess('Document deleted successfully!').action())
      dispatch(new UpdateCustomerDocuments(response.data.data, customer).action())
    } catch(e) {
      console.log(e)
      dispatch(new ResponseError('Something wrong happened!').action())
    }
  }
  return (
    <>
      <section className="card mb20 remaining-time">
        <header className="card-header">
          <h2 className="card-title">Documents</h2>
          <div className="card-head-actions">
            <a className="btn btn-orange" href="#" onClick={() => setShowDocumentModal(true)}>
              Add Documents
            </a>
          </div>
        </header>
        <div className="card-body">
          <ul className="list-style-none doc-list">
            <li>
              <div className="doc-name">
                <i className="fa fa-address-card-o mr-2" aria-hidden="true"></i>
                DL Front Page
              </div>
              { customer?.driverLicenseDetail?.frontImageUrl ?
                <div className="doc-action">
                  <a
                    href={ customer?.driverLicenseDetail?.frontImageUrl }
                    className="btn btn-outline-success btn-xs mr-1"
                    title="Download Document"
                    target={ "_blank" } rel="noreferrer"
                  
                  >
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </a>
                </div> : "" }
            </li>
            <li>
              <div className="doc-name">
                <i className="fa fa-address-card-o mr-2" aria-hidden="true"></i>
                DL Back Page
              </div>
              { customer?.driverLicenseDetail?.frontImageUrl ?
              <div className="doc-action">
                <a
                  href={customer?.driverLicenseDetail?.backImageUrl}
                  className="btn btn-outline-success btn-xs mr-1"
                  title="Download Document"
                  target={"_blank"} rel="noreferrer"
                >
                  <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </div>: "" }
            </li>
            {
              customer.userDocuments && customer.userDocuments.map((doc) => (
                <li>
                  <div className="doc-name">
                    <i className="fa fa-address-card-o mr-2" aria-hidden="true"></i>
                    {doc.name}
                  </div>
                  { customer?.driverLicenseDetail?.frontImageUrl ?
                  <div className="doc-action">
                    <a
                      href={doc.url}
                      className="btn btn-outline-success btn-xs mr-1"
                      title="Download Document"
                      target={"_blank"} rel="noreferrer"
                    >
                      <i className="fa fa-download" aria-hidden="true"></i>
                    </a>
                    <a
                    href="#"
                    className="btn btn-outline-danger btn-xs"
                    title="Delete"
                    onClick={() => hanleDeleteDocument(doc.id)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                  </div>: "" }
                </li>
              ))
            }
          </ul>
        </div>
      </section>
      <JAXModal
          heading={`Add/Edit Documents`} 
          show={ showDocumentModal } 
          dialogClassName="single-upload-modal modal-dialog-md"
          handleClose={() => setShowDocumentModal(false)}
      >
          <AddDocuments customerId={customer.id} handleClose={() => setShowDocumentModal(false)} />
      </JAXModal>
    </>
  );
};

export default CustomerDocuments;
