import React, { FC, useState, useEffect } from "react";
import { Note } from "../../../../store/notes/model";

interface AddEditNotePopupInterface {
  note: Note;
  handleUpdate: (note: Note) => void;
}

const AddEditNotePopup: FC<AddEditNotePopupInterface> = (
  props: AddEditNotePopupInterface
) => {
  const { note, handleUpdate } = props;

  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(note?.notes);
  }, []);

  const onSubmit = () => {
    note.notes = description;
    handleUpdate(note);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="form-group">
          <textarea
            className="form-control text-center"
            placeholder="Enter note here."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center mt-3">
          <button
            className="btn btn-orange"
            type="submit"
            onClick={(e) => onSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotePopup;
