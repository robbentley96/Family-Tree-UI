import { Injectable } from '@angular/core';
import { Person } from 'app/models/person';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PersonSimplifiedDTO } from 'app/models/personSimplifiedDTO';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  apiUrl = environment.apiUrl;
  apiCode = environment.apiCode;
  constructor(private http: HttpClient) { }

  getPerson(id: string): Observable<Person>{
    return this.http.get<Person>(`${this.apiUrl}/GetPerson/${id}?code=${this.apiCode}`);
  }
  getPeople(): Observable<PersonSimplifiedDTO[]>{
    return this.http.get<PersonSimplifiedDTO[]>(`${this.apiUrl}/GetPeople?code=${this.apiCode}`);
  } 
  createPerson(person: Person): Observable<{id: string}>{
    return this.http.post<{id: string}>(`${this.apiUrl}/CreatePerson?code=${this.apiCode}`, person);
  }
  updatePerson(id: string, person: Person): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/UpdatePerson/${id}?code=${this.apiCode}`, person);
  }
  deletePerson(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/DeletePerson/${id}?code=${this.apiCode}`);
  }
}
