import {
  Note,
  NotesSectionState,
  NotesSectionAction,
  NoteSearchCriteria,
} from "./model";
import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { ResponseError, ResponseSuccess } from '../shared/model';

export const fetchNotes = (searchCriteria?: NoteSearchCriteria) => {
  return async (dispatch: Dispatch<Action>, state: NotesSectionState) => {
    Api.post(
      `/api/v1/notes/search`,
      searchCriteria ? searchCriteria : state.searchCriteria
    )
      .then(function (response) {
        dispatch(setNotesList(response?.data?.data, searchCriteria));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const addNote = (note: Note) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post("/api/v1/notes/create", note)
      .then(function (response) {
        if (response.data.data) {
          dispatch(setAddNote(response.data.data));
        }
        dispatch(new ResponseSuccess(response.data.message).action());
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const editNote = (note: Note) => {
  return async (dispatch: Dispatch<Action>) => {
    if (note) {
      Api.put(`/api/v1/notes/update/${note.id}`, note)
        .then(function (response) {
          dispatch(setUpdateNote(note));
          dispatch(new ResponseSuccess(response.data.message).action());
        })
        .catch(function (error) {
          dispatch(new ResponseError(error.message).action());
        });
    } else {
      dispatch(new ResponseError("Note not found.").action());
    }
  };
};

export const deleteNote = (note: Note) => {
  return async (dispatch: Dispatch<Action>) => {
    if (note) {
      Api.delete(`/api/v1/notes/delete/${note.id}`)
        .then(function (response) {
          dispatch(setDeleteNote(note));
          dispatch(new ResponseSuccess(response.data.message).action());
        })
        .catch(function (error) {
          dispatch(sendError(error.message));
          dispatch(new ResponseError(error.message).action());
        });
    } else {
      dispatch(new ResponseError("Note not found.").action());
    }
  };
};

const setNotesList = (
  data: any,
  searchCriteria?: NoteSearchCriteria
): PayloadAction<NotesSectionAction> => {
  const notesSection: NotesSectionAction = new NotesSectionAction(data);
  notesSection.searchCriteria = searchCriteria;

  return {
    type: "SET_NOTES_LIST",
    payload: notesSection,
  };
};

const setAddNote = (data: any): PayloadAction<NotesSectionAction> => {
  const notesSectionAction: NotesSectionAction = new NotesSectionAction(null);
  notesSectionAction.note = new Note(data);

  return {
    type: "ADD_NOTE",
    payload: notesSectionAction,
  };
};

const setUpdateNote = (note: Note): PayloadAction<NotesSectionAction> => {
  const notesSectionAction: NotesSectionAction = new NotesSectionAction(null);
  notesSectionAction.note = note;

  return {
    type: "UPDATE_NOTE",
    payload: notesSectionAction,
  };
};

const setDeleteNote = (note: Note): PayloadAction<NotesSectionAction> => {
  const notesSectionAction: NotesSectionAction = new NotesSectionAction(null);
  notesSectionAction.note = note;

  return {
    type: "COMPONENT_DELETE_NOTE",
    payload: notesSectionAction,
  };
};
