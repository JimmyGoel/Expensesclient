import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteEntryComponent } from './delete-entry/delete-entry.component';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EntryService {


  
  baseURL: string = 'http://localhost:52756/api/Entries/'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseURL + 'User-Entries');
  }
  getEntrybyId(id: number) {
    return this.http.get(this.baseURL + 'User-Entries' + '/' + id);
  }
  createEntry(entity: any) {
       return this.http.post(this.baseURL + 'new-entry', entity);
  }
  updateEntry(id: number, entity: any) {
    console.log(this.baseURL + 'update-entry' + '/' + id, entity);
    return this.http.put(this.baseURL + 'update-entry' + '/' + id, entity);
  }
  deleteEntry(id:number){
    return this.http.delete(this.baseURL + 'delete-entry' + '/' + id);
  }


  


}
