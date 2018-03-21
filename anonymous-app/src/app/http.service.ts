import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getNotes(){
    return this._http.get('/notes');
  }
  addNotes(newNote){
    return this._http.post('/notes', newNote);
  }
}
