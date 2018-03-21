import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Anonymous Notes';
  newNote: any;
  error ='';
  postNotes = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this.newNote = {text: ""}
    this.getNotes();
  }
  getNotes(){
    let observable = this._httpService.getNotes();
    observable.subscribe(data =>{
      console.log("Got our Notes", data)
      this.postNotes = data['data'];
    })
  }
  addNote(){
    let observable = this._httpService.addNotes(this.newNote);
    observable.subscribe(data =>{
      if(data['error']){
        this.error = data['error']['errors']['text']['message']
      }
      else{
        console.log("A note was added", data)
        this.newNote = {text: ""}
        this.getNotes();
      }
    })
  }
  getHome(){
    this._router.navigate(['/'])
  }
}

