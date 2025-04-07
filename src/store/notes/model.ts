export class NotesSectionState {
  count: number = 0;
  notesList: Note[] = [];
  searchCriteria?: NoteSearchCriteria = new NoteSearchCriteria();

  constructor(notesList: any) {
    if (notesList?.length) {
      this.count = notesList.length;
      this.notesList = notesList.map((note: any) => new Note(note));
    }
  }
}

export class NotesSectionAction {
  notesList: Note[] = [];
  searchCriteria?: NoteSearchCriteria = new NoteSearchCriteria();
  note?: Note;

  constructor(notesList: any) {
    if (notesList?.length) {
      this.notesList = notesList.map((note: any) => new Note(note));
    }
  }
}

export class Note {
  id?: number;
  notes: string = "";
  rentalId?: number = 0;
  userId?: number = 0;
  vehicleId?: number = 0;
  author: string = "";
  createdAt: Date = new Date();
  isEdit?: boolean;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.vehicleId = data.vehicleId;
      this.userId = data.userId;
      this.createdAt = data.createdAt;
      this.notes = data.notes;
      this.rentalId = data.rentalId;
      this.author = data.author;
    }
  }
}

export class NoteSearchCriteria {
  rentalId?: number = 0;
  userId?: number = 0;
  vehicleId?: number = 0;
}
