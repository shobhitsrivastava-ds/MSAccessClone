import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  _url= 'localhost:8080/graphql'
  constructor(private _http: HttpClient) { }

  enroll(data: string[]) {
    console.log("Printing the data",data);
    return(this._http.post<any>(this._url, data));
  }

}
