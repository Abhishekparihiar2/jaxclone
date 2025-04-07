import { NotesSectionState, NotesSectionAction, Note } from "./model";
import { PayloadAction } from "../index";

const initialState = new NotesSectionState(null);
export const notesSection = (
  state: NotesSectionState = initialState,
  { type, payload }: PayloadAction<NotesSectionAction>
): NotesSectionState => {
  switch (type) {
    case "SET_NOTES_LIST":
      return {
        ...state,
        count: payload?.notesList?.length,
        notesList: payload.notesList,
        searchCriteria: payload.searchCriteria,
      };
    case "ADD_NOTE":
      let notesList: Note[] = state.notesList;
      if (payload.note) {
        notesList.push(payload.note);
      }
      return {
        ...state,
        count: notesList.length,
        notesList: notesList,
      };
    case "UPDATE_NOTE":
      let updatedNotes: Note[] = state.notesList;
      if (payload.note) {
        const payloadNote = payload.note;
        updatedNotes = state.notesList.map((note) => {
          return note.id === payloadNote.id ? payloadNote : note;
        });
      }
      return {
        ...state,
        count: updatedNotes.length,
        notesList: updatedNotes,
        searchCriteria: payload.searchCriteria,
      };
    case "COMPONENT_DELETE_NOTE":
      let listAfterDelete: Note[] = state.notesList;
      if (payload.note) {
        const payloadNote = payload.note;
        listAfterDelete = state.notesList.filter(
          (note) => note.id !== payloadNote.id
        );
      }
      return {
        ...state,
        count: listAfterDelete.length,
        notesList: listAfterDelete,
        searchCriteria: payload.searchCriteria,
      };

    default:
      return state;
  }
};
