import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
// import { IProduct } from '../interfaces/Product';
import { Product } from '../models/product';

const baseUrl = "http://localhost:5000";

@Injectable({
  providedIn: 'root'
})
export class Service {

  
  constructor(private _http: HttpClient) { }
// Dữ liệu trả về Observable
  getProducts(): Observable<Product[]>{
    return this._http.get<Product[]>(`${baseUrl}/products`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
    
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
// Post Product
  postProduct(data: Product): Observable<any> {
    return this._http.post<Product>(`${baseUrl}/product`,data)
  }
  // Update product
  updateProduct(id: number, newData: Product): Observable<any> { 
    return this._http.patch(`${baseUrl}/${id}`,newData)
  }
  // Delete
  deleteProduct(id: string){
    return this._http.delete(`${baseUrl}/${id}`)

  }
 
  

}
