import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IProduct } from '../interfaces/Product';
import { Product } from '../models/product';

import { IUser } from '../interfaces/User';
import { User } from '../models/users';
import { Blog } from '../models/blogs';
import { IBlog } from '../interfaces/Blog';

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
 
 


  getAllProducts(){
    return this._http.get(`${baseUrl}/products`).pipe(
    retry(2),
    catchError(this.handleError)
    )
  }
  

  // ******************* USER *************************

  // Post User
  authenticate(data: User): Observable<any> {
    return this._http.post<User>(`${baseUrl}/authenticate`,data)
  }

  //*****************BLOG************************** */
  // Dữ liệu blogs trả về Observable
  getBlogs(): Observable<IBlog[]>{
    return this._http.get<IBlog[]>(`${baseUrl}/blogs`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
    
  // Post Blog
  postBlog(data: Blog): Observable<any> {
    return this._http.post<Blog>(`${baseUrl}/blog`,data)
  }
  // Update blog
  updateBlog(id: number, newData: Blog): Observable<any> { 
    return this._http.patch(`${baseUrl}/${id}`,newData)
  }
  // Delete
  deleteBlog(id: string){
    return this._http.delete(`${baseUrl}/${id}`)

  }

  getAllBlogs(){
    return this._http.get(`${baseUrl}/blogs`).pipe(
    retry(2),
    catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }


  uploadData(data: any){
    return this._http.post(`${baseUrl}/upload`, data).pipe(
      retry(2),
      catchError(this.handleError)
    )
    
  }

}
