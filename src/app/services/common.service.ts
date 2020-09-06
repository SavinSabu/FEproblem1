import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  url = environment.API_URL;
  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    return this.http.post(this.url + 'token',{}, {headers: {'Accept' : 'application/json'}});
  }
}
