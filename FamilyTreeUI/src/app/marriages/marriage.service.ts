import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marriage } from 'app/models/marriage';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarriageService {

  apiUrl = environment.apiUrl;
  apiCode = environment.apiCode;
  constructor(private http: HttpClient) { }

  createMarriage(marriage: Marriage): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/CreateMarriage?code=${this.apiCode}`, marriage);
  }
  updateMarriage(id: string, marriage: Marriage): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/UpdateMarriage/${id}?code=${this.apiCode}`, marriage);
  }
  deleteMarriage(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/DeleteMarriage/${id}?code=${this.apiCode}`);
  }
}
