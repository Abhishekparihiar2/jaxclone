import { RefObject, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Api from "../../../Api";
import { ResponseError } from "../../../store/shared/model";
import { DocumentInterface } from "../../customers/shared/add-documents";

const EmployeeDocuments = ({
  customerDocuments = [],
  handelDeleteDocument,
  setCustomerDocuments,
  formDocumentHandler,
}: {
  customerDocuments: DocumentInterface[];
  setCustomerDocuments: React.Dispatch<
    React.SetStateAction<DocumentInterface[]>
  >;
  handelDeleteDocument: (i: number) => void;
  formDocumentHandler: (newDoc: DocumentInterface) => void;
}) => {
  const dispatch = useDispatch();
  const [, setImageURL] = useState("");
  const [docName, setDocName] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const ref = useRef<any>();
  const [fileName, setfileName] = useState("");
  const [showAddDoc, setShowAddDco] = useState(false);
  const handleDocumentsImage = async (event: any, index: number) => {
    if (event.target.files) {
      setImageURL(URL.createObjectURL(event.target.files[0]));
      const fd = new FormData();
      fd.append("type", "customer/documents");
      fd.append("image", event.target.files[0]);
      setfileName(event.target.files[0].name);
      try {
        const response = await Api.post("/api/v1/upload-image", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setDocUrl(response.data.data);
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  const deleteDocument = (index: number) => {
    handelDeleteDocument(index);
  };

  const saveDocument = () => {
    if (!docName) {
      dispatch(new ResponseError("Please enter document name.").action());
    }
    setCustomerDocuments([...customerDocuments, {
      name: docName,
      url: docUrl,
    }]);
    formDocumentHandler({
      name: docName,
      url: docUrl,
    });
    setfileName('');
    setDocName('');
    setDocUrl('');
    if(ref.current && ref.current.value){
      ref.current.value = '';
    }
  };

  return (
    <>
      {customerDocuments && customerDocuments.length > 0 && <div className="col-md-12">
        <div className="modal-doc-panel">
          <label>Documents:</label>
          <div className="modal-doc-list">
            <ul className="list-style-none ">
              {customerDocuments && customerDocuments.map((doc, i) => <li>
                <span>
                  <a href={doc.url} target='_blanck' className="text">
                    <i className="fa fa-download mr-1" aria-hidden="true"></i>
                    <b>{doc.name}</b>
                  </a>
                  <a href='#' onClick={()=>deleteDocument(i)} className="close-doc">
                    <i className="fa fa-close" aria-hidden="true"></i>
                  </a>
                </span>
              </li>)}
            </ul>
          </div>
        </div>
      </div>}
      <div className="col-md-12">
        <section className="card mb20">
          <header className="card-header">
            <h2 className="card-title">Add Documents</h2>
            <div className="card-head-actions">
              <span className="btn orange-circle" onClick={()=>setShowAddDco(!showAddDoc)}>
              {showAddDoc ? <i className="fa fa-minus" aria-hidden="true"></i> : <i className="fa fa-plus" aria-hidden="true"></i>}
              </span>
            </div>
          </header>
          {showAddDoc && <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <input
                    type="text"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="form-control single-line-control"
                    placeholder="Document Title"
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      ref={ref as any}
                      type="file"
                      className="custom-file-input"
                      onChange={(e) =>
                        handleDocumentsImage(
                          e,
                          customerDocuments?.length > 0
                            ? customerDocuments?.length - 1
                            : 0
                        )
                      }
                    />
                    <label
                    className={`custom-file-label ${
                      fileName ? "ellipsis" : ""
                    }`}
                  >
                    {fileName
                      ? fileName
                      : "Select file"}
                  </label>
                  </div>
                </div>
              </div>
              <div className="col-md-2 doc-save-action">
                <span
                  className="btn btn-orange min-w-none"
                  onClick={() => saveDocument()}
                >
                  Save
                </span>
              </div>
            </div>
          </div>}
        </section>
      </div>
    </>
  );
};

export default EmployeeDocuments;
