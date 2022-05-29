import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError  } from 'rxjs';
import { IUser } from '../interfaces/User';
import { User } from "../models/users";





const baseUrl ="http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http:HttpClient) { }
  handleError(err: HttpErrorResponse){
    return throwError(()=> new Error(err.message))
  }
  getUser(): Observable<IUser[]>{
    return this._http.get<IUser[]>(`${baseUrl}/users`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}


