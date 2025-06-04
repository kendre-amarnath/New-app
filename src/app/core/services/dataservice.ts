import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataEntry } from '../model/data_entry_model';

@Injectable({ providedIn: 'root' })
export class DataService {
    private data: DataEntry[] = [];
    private dataSubject = new BehaviorSubject<DataEntry[]>([]);
  
    constructor(private http: HttpClient) {}
  
    loadData(): void {
      this.http.get<DataEntry[]>('assets/data/entries.json').subscribe(entries => {
        this.data = entries;
        this.dataSubject.next(this.data);
      });
      
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