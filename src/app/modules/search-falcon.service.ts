import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchFalconService {
  
  private totalTimeTaken = new BehaviorSubject<string>(null);
  private totalTimeTakenObservable = this.totalTimeTaken.asObservable();
  private planetFound = new BehaviorSubject<string>(null);
  private planetFoundObservable = this.planetFound.asObservable();
  
  url = environment.API_URL;
  constructor(private http: HttpClient) { }

  getAllPlanets(): Observable<any> {
    return this.http.get(this.url + 'planets');
  }

  getAllVehicles(): Observable<any> {
    return this.http.get(this.url + 'vehicles');
  }

  findFalcon(data): Observable<any> {
    return this.http.post(this.url + 'find',data, {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json'}});
  }

  setTimeTaken(timeTaken: number) {
    this.totalTimeTaken.next(String(timeTaken));
  }

  setPlanetFound(timeTaken: number) {
    this.planetFound.next(String(timeTaken));
  }

  getTimeTaken():Observable<any> {
    return this.totalTimeTakenObservable;
  }

  getPlanetFound():Observable<any> {
    return this.planetFoundObservable;
  }
}
