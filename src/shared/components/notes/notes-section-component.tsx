import React, { useState, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoteSearchCriteria } from "../../../store/notes/model";
import {
  fetchNotes,
  addNote,
  editNote,
  deleteNote,
} from "../../../store/notes/action";
import JAXModal from "../modal/jax-modal";
import { StoreInterface } from "../../../store";
import { NotesSectionState, Note } from "../../../store/notes/model";
import AddEditNoteComponent from "./components/add-edit-note-popup";
import moment from "moment";

interface NotesSectionInterface {
  rentalId?: number;
  vehicleId?: number;
  userId?: number;
  notes?: string;
  author?: string;
}

const NotesSectionComponent: FC<NotesSectionInterface> = (
  props: NotesSectionInterface
) => {
  const { rentalId, vehicleId, userId } = props;
  //popup state
  const [showAddNotePopup, setShowAddNotePopup] = useState<boolean>(false);
  const [popUpMode, setPopUpMode] = useState<string>("");
  const [note, setNote] = useState<Note>(new Note(null));
  const [chunkedData, setChunkData] = useState<any[]>([])
  const [viewAll, setViewAll] = useState<boolean>(false)

  const dispatch = useDispatch();
  const notes: NotesSectionState = useSelector(
    (state: StoreInterface) => state.notesSection
  );

  const loginState = useSelector((state: StoreInterface) => state.login);

  useEffect(() => {
    const searchCriteria: NoteSearchCriteria = new NoteSearchCriteria();
    searchCriteria.rentalId = rentalId;
    searchCriteria.userId = userId;
    searchCriteria.vehicleId = vehicleId;
    dispatch(fetchNotes(searchCriteria));
    // eslint-disable-next-line
  }, []);

  const openAddPopup = () => {
    setNote(new Note(null));
    setPopUpMode("add");
    setShowAddNotePopup(true);
  };

  const openEditPopup = (note: Note) => {
    setNote(note);
    setPopUpMode("edit");
    setShowAddNotePopup(true);
  };

  const handleUpdate = (noteFromPopup: Note) => {
    if (popUpMode === "add") {
      noteFromPopup.rentalId = rentalId;
      noteFromPopup.userId = userId;
      noteFromPopup.vehicleId = vehicleId;
      noteFromPopup.author = loginState.name ? loginState.name : "Admin";
      delete noteFromPopup.id
      dispatch(addNote(noteFromPopup));
    } else {
      dispatch(editNote(noteFromPopup));
    }
    setShowAddNotePopup(false);
  };

  const deleteNoteHandler = (note: Note) => {
    setNote(new Note(null));
    dispatch(deleteNote(note));
  };
    
  const sort = (array: Note[]) => {
      return array.sort((a: Note, b: Note) => {
          if(a && b && a.id && b.id){
              if(a.id < b.id)
                  return 1
              if((new Date(a.createdAt).getTime()) > (new Date(b.createdAt).getTime()))
                  return -1    
          }
          return 0    
      })
  }

  useEffect(() => {
      const chunks: any = []
      if(notes && notes.notesList && notes.notesList.length > 0){
          const sortedArray = sort(notes.notesList)
          console.log(sortedArray)
          const firstChunk = sortedArray.slice(0, 5)
          const secondChunk = sortedArray.slice(5)
          chunks.push(firstChunk, secondChunk)
        }
        setChunkData(chunks)
        // eslint-disable-next-line
  }, [notes.count])
  return (
    <>
      <section className="card mb20">
        <header className="card-header">
          <h2 className="card-title">Notes</h2>
          <div className="card-head-actions">
            <span
              className="btn btn-orange"
              data-toggle="modal"
              data-target="#addNotes"
              onClick={(e) => {
                openAddPopup();
              }}
            >
              Add Notes
            </span>
          </div>
        </header>
        <div className="card-body">
        <>
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
                {
                  chunkedData && chunkedData.length > 0 ? 
                    <>
                      {
                        chunkedData.map((data, dataIndex) => {
                          return (
                            data.map((noteItr: Note) => (
                              <tr style={{display: dataIndex === 0 || (dataIndex > 0 && viewAll) ? "" : "none"}}>
                                <td>{noteItr.notes}</td>
                                <td>{moment(noteItr?.createdAt).format('lll')}</td>
                                <td>{noteItr.author}</td>
                                <td className="td-action">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-xs mr-1"
                                    title="Edit"
                                    onClick={(e) => {
                                      openEditPopup(noteItr);
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-xs mr-1"
                                    data-toggle="modal"
                                    data-target="#deleteModal"
                                    title="Delete"
                                    onClick={(e) => {
                                      deleteNoteHandler(noteItr);
                                    }}
                                  >
                                    <i
                                      className="fa fa-trash-o"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          );
                        })
                      }
                    </>
                  : 
                  <div className="card-body">No Notes Found.</div>
                }
                </tbody>
              </table>
            </div>
            {
              chunkedData && chunkedData.length > 0 ? 
              <div className="text-right p-3 view-more">
                {
                    viewAll ? <span className="btn btn-orange btn-sm" onClick={() => setViewAll(false)}>
                        Hide
                    </span>
                        :
                        <span className="btn btn-orange btn-sm" onClick={() => setViewAll(true)}>
                        View More
                        </span>
                }
              </div>
              :
              ""
            }
            </>


          {/* {notes && notes?.count ? (
            
          ) : (
            "No Notes Found."
          )} */}
        </div>
      </section>
      <JAXModal
        heading={`Note Details`}
        show={showAddNotePopup}
        handleClose={() => setShowAddNotePopup(false)}
      >
        <AddEditNoteComponent
          note={note}
          handleUpdate={handleUpdate}
        ></AddEditNoteComponent>
      </JAXModal>
    </>
  );
};

export default NotesSectionComponent;
