import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataEntry } from '../model/data_entry_model';

@Injectable({ providedIn: 'root' })
export class DataService {

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
  private searchQueries: Record<string, BehaviorSubject<string>> = {
    view: new BehaviorSubject<string>(''),
    search: new BehaviorSubject<string>(''),
    modify: new BehaviorSubject<string>('')
  };
  setSearchQueryForTab(tab: string, query: string) {
    if (this.searchQueries[tab]) {
      this.searchQueries[tab].next(query);
    }
  }
//--------------------------------------------------------------------------------
///-------------------------------------------------------------------------------
  getSearchQueryForTab(tab: string): Observable<string> {
    return this.searchQueries[tab].asObservable();
  }

    private data: DataEntry[] = [];
    private dataSubject = new BehaviorSubject<DataEntry[]>([]);
    private dataUrl = 'http://localhost:8080/api/userdata';

//-----------------------------------------------------------------------
///---------------------getting data by filenumber-----------------------
//-----------------------------------------------------------------------
  getUserByFileNumber(fileNumber: string): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.dataUrl}/fileNumber/${fileNumber}`; 
    return this.http.get<any>(url, { headers });
  }


  //-----------------------------------------------------------------------
///---------------------getting data by filenumber-----------------------
//-----------------------------------------------------------------------

  updateUserByFileNumber(fileNumber: string, updatedData: any): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.dataUrl}/fileNumber/${fileNumber}`; 
    return this.http.put(url, updatedData, { headers }); 
  }
  
  deleteUserByFileNumber(fileNumber:string):Observable<any>{
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.dataUrl}/fileNumber/${fileNumber}`; 
    return this.http.delete<any>(url, { headers });
  }
  
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any[]> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.dataUrl, { headers });
  }
      

 
    private searchTermSource = new Subject<string>();
    searchTerm$ = this.searchTermSource.asObservable();
  
    sendSearchTerm(term: string) {
      this.searchTermSource.next(term);
    }
    getData(): Observable<DataEntry[]> {
      return this.dataSubject.asObservable();
    } 
  }