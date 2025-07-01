import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DataEntry } from "../model/data_entry_model";

@Injectable({ providedIn: 'root' })
export class DataTransferService {
  private data: any;
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();
  private usernameSubject = new BehaviorSubject<string>(''); // default value
  public username$ = this.usernameSubject.asObservable();

  setUsername(username: string) {
    this.usernameSubject.next(username);
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }


  setData(data: any) {
    this.data = data;
  }

  // getRowData(): any {
  //   return this.data;
  // }
  getRowData(): Observable<DataEntry[]> {
    return this.dataSubject.asObservable();
  } 



  setRowData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }


  clearData() {
    this.data = null;
  }
  getCurrentData() {
    return this.dataSubject.getValue();
  }
}
