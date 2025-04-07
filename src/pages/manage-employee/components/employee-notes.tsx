import moment from "moment";
import { StoreInterface } from "../../../store";
import { Note } from "../../../store/notes/model";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
    editNote,
  } from "../../../store/notes/action";

const EmployeeNotes = ({
  savedNote,
  handleSave,
  handleNoteUpdate,
  handleDelete
}: {
  savedNote: Note[];
  handleSave: (s: Note) => void;
  handleNoteUpdate: (i:number, n: Note) => void;
  handleDelete: (i: number)=>void;
}) => {
  const dispatch = useDispatch();
  const [note, setNote] = useState<string>('');
  const [editNoteStr, setEditNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const loginState = useSelector((state: StoreInterface) => state.login);
  const updateNotes = (value: string) => {
    setNote(value);
  };
  const saveNote = (value: Note) => {
    if(value.notes) {
        setNote('');
        handleSave(value);    
    }
  }

  return (
    <>
      <div className="col-md-12">
        <section className="card mb20">
          <header className="card-header">
            <h2 className="card-title">Notes</h2>
          </header>
          <div className="card-body">
              <div className="form-group notes-input">
                <input
                  type="text"
                  className="form-control single-line-control"
                  placeholder="Add Note Here"
                  value={note}
                  onChange={(e) => updateNotes(e.target.value)}
                />
                <span
                  className="btn btn-orange btn-sm"
                  onClick={() => saveNote({
                    notes: note, author: loginState.name ? loginState.name : "Admin", createdAt: new Date()})}
                >
                  Save
                </span>
              </div>
          </div>
        </section>
      </div>
      <div className="table-responsive notes-table">
        <table className="table table-bordered mb-0">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Notes</th>
              <th style={{ width: "17%" }}>Created Date</th>
              <th style={{ width: "15%" }}>Author</th>
              <th style={{ width: "13%" }} className="th-action"></th>
            </tr>
          </thead>
          <tbody>
            {savedNote && savedNote.length > 0 ? (
              <>
                {savedNote.map((data, dataIndex) => {
                    return <tr key={dataIndex} >
                      <td>{!data.isEdit ? data.notes : <input type={'text'} value={editNoteStr} onChange={(e)=>{setEditNote(e.target.value)}} />}</td>
                      <td>{moment(data?.createdAt).format("lll")}</td>
                      <td>{data.author}</td>
                      <td className="td-action">
                        {!data.isEdit  ? 
                        <>
                        <button
                          type="button"
                          disabled={isEditing}
                          className="btn btn-outline-secondary btn-xs mr-1"
                          title="Edit"
                          onClick={(e) => {
                            setIsEditing(true);
                            data.isEdit = true;
                            setEditNote(data.notes);
                            handleNoteUpdate(dataIndex, data);
                          }}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-xs mr-1"
                          data-toggle="modal"
                          data-target="#deleteModal"
                          title="Delete"
                          onClick={(e) => {
                            handleDelete(dataIndex)
                          }}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </button></> : <>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-xs mr-1"
                          title="Save"
                          onClick={(e) => {
                            if(data.id){
                                setIsEditing(false);
                                data.isEdit = false;
                                dispatch(editNote({ ...data, notes: editNoteStr}));
                            } else { 
                                setIsEditing(false);
                                data.isEdit = false;
                                handleNoteUpdate(dataIndex, { ...data, notes: editNoteStr});
                            }
                          }}
                        >
                          <i className="fa fa-save" aria-hidden="true"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-xs mr-1"
                          data-toggle="modal"
                          data-target="#deleteModal"
                          title="Cancel"
                          onClick={(e) => {
                            setIsEditing(false);
                            data.isEdit = false;
                            setEditNote(data.notes);
                            handleNoteUpdate(dataIndex, data);
                          }}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button></>}
                      </td>
                    </tr>
                })}
              </>
            ) : (
              <div className="card-body">No Notes Found.</div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeNotes;


