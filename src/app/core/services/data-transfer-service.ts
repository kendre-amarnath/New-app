import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataTransferService {
  private data: any;
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.data = data;
  }

  getRowData(): any {
    return this.data;
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
