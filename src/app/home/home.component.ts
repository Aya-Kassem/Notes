import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  NoteHeading: string = '';
  NoteBody: string = '';
  NoteWrapper: any;
  AllNotes: Array<any> = [];
  notePosition: number = 0;


  constructor() { }


  // DISPLAY SAVED NOTES AND CALLING TOKEN FUNCTION .......
  ngOnInit(): void {

    if (localStorage.getItem('UserNotes') != null) {
      let StoredNotes: any = localStorage.getItem('UserNotes');
      StoredNotes = JSON.parse(StoredNotes)
      this.AllNotes = StoredNotes;
    }

  }

  // ADDING NOTES..........
  AddNote() {
    if (this.NoteHeading != '' && this.NoteBody != '') {
      this.NoteWrapper = { heading: this.NoteHeading, body: this.NoteBody };
      this.AllNotes.push(this.NoteWrapper);
    }
    localStorage.setItem('UserNotes', JSON.stringify(this.AllNotes));
    this.NoteHeading = '';
    this.NoteBody = '';
  }


  // PASSING NOTE INDEX TO DELETING FUNCTION .......
  deleteNote(i: any) {
    this.notePosition = i;
  }

  // DELETE NOTE ............
  ConfirmDelete() {
    this.AllNotes.splice(this.notePosition, 1)
    localStorage.setItem('UserNotes', JSON.stringify(this.AllNotes))
  }

  // UPDATE NOTE ..........
  EditNote(i: any) {
    this.notePosition = i;
    this.NoteHeading = this.AllNotes[i].heading;
    this.NoteBody = this.AllNotes[i].body;
  }

  // CONFIRM UPDATES ...........
  ConfirmUpdate() {
    if (this.NoteHeading != '' && this.NoteBody != '') {
      this.AllNotes[this.notePosition].heading = this.NoteHeading;
      this.AllNotes[this.notePosition].body = this.NoteBody;
    }
    localStorage.setItem('UserNotes', JSON.stringify(this.AllNotes));
    this.NoteHeading = '';
    this.NoteBody = '';
  }

}
