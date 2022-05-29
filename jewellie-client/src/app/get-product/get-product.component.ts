// import { Component, OnInit } from '@angular/core';



// @Component({
//   selector: 'app-get-product',
//   templateUrl: './get-product.component.html',
//   styleUrls: ['./get-product.component.css']
// })


// export class GetProductComponent implements OnInit {

//   foods: Category[] = [
//     {value: 'category-0', viewValue: 'Category 1'},
//     {value: 'category-1', viewValue: 'Category 2'},
//     {value: 'category-2', viewValue: 'Category 3'},
//   ];


  
//   constructor() {
//    }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { Service } from '../services/services.service';
import { FormBuilder, Validators } from '@angular/forms';


// interface products {
//   value: string;
//   viewValue: string;
// }

// export interface PeriodicElement {
//   id: number;
//   image: string;
//   name: string;
//   category: string;
//   price: string;
//   warehouse: string;
//   edit: string;
//   delete: string;

// }


// const ELEMENT_DATA: PeriodicElement[] = [
//   {id: 1, image: '', name: "", category: '', price: "", warehouse: "", edit: "", delete: ""},
// ];
@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
  
})
export class GetProductComponent implements OnInit {

  public testForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    file: ['']
  })

  products: any;
  product: Product=new Product();
  errorMessage: string = "";
  file: any = null;

  // displayedColumns: string[] = ['id', 'image', 'name', 'category', 'price', 'warehouse', 'edit', 'delete'];
  // // columnsToDisplay = ['id', 'image', 'name', 'category', 'price', 'warehouse', 'edit', 'delete'];
  // dataSource = ELEMENT_DATA;

  constructor(private _service: Service,private _formBuilder:FormBuilder, private _toast:ToastrService
    ) {
      this._service = _service;
      console.log('this._service')
      console.log(this._service)
     }
  ngOnInit(): void {
    this.getAllProducts()
  }

  // Xử lý form update
  // Submit
  submitForm(form: NgForm){
    if(this.product._id ==''){

      this._service.postProduct(this.product).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res));
           if (resData.message === "success"){
            this._toast.success("Insert Successfully!", "Success!");
             this.getAllProducts();
           }else{
             alert("Fail!")
          }
            })
          }
    else{
      this._service.updateProduct(this.product._id, this.product).subscribe(res =>{
        let resData = JSON.parse(JSON.stringify(res));
        if(resData.message === "success"){
          // alert("Updated Successfully!");
          this._toast.success("Updated Successfully!", "Success!");
          this.onReset();
          this.getAllProducts();
        }else{
          alert("fail");
        }
      });
    
    }
      
    }

    onSelectFile(event:any){
      if ( event.target.files.length > 0){
        // console.log("File info: ",event.target.files[0])
        this.file = event.target.files[0];
      }else{
        this.file = null;
      }
      }
  // Nút edit 
  onEdit(data: Product) {
      this.product=data;
  }
  onReset(form?: NgForm) {
    if (form) {
      form.reset();
    } 
    this.product= new Product();
  }
  // delete
  onDelete(id: any, form: NgForm) {
    if (confirm("are you sure want to delete this product?")==true) {
      this._service.deleteProduct(id).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
          // alert('Delete successfully');
          this._toast.success('Delete successfully','Delete!')

          this.onReset(form)
          this.getAllProducts()
        }
        else {
          alert(resData.message);
        }
      })
    }
  }
  
  // Xử lý load table
  getAllProducts() {
    this._service.getProducts().subscribe({
      next: data => this.products = data,
      error: err => this.errorMessage = err
    })
  }

  // Reset
  // resetForm() {
  //   (<HTMLFormElement>document.getElementById("form-update")).reset();
  // }




}
