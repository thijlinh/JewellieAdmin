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
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product'
import { Service } from 'src/app/services/services.service';

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

  products: any;
  product: Product=new Product();
  errorMessage: string = "";

  // displayedColumns: string[] = ['id', 'image', 'name', 'category', 'price', 'warehouse', 'edit', 'delete'];
  // // columnsToDisplay = ['id', 'image', 'name', 'category', 'price', 'warehouse', 'edit', 'delete'];
  // dataSource = ELEMENT_DATA;

  // constructor(private _service: Service, private _toast:ToastrService
  //   ) {
  //     this._service = _service;
  //     console.log('this._service')
  //     console.log(this._service)
  //    }

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private _service:Service, private _toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllProducts();
  }
  // getAllProducts(){
  //   this._service.getProducts().subscribe({
  //     next: (data: any) => (this.products = data)
  //   })
  // }

  // Xử lý form update
  // Submit
  submitForm(form: NgForm) {
    // console.log("form: ", form.value)
    // console.log(this.product)
    if (this.product._id == '') {
      this._service.postProduct(this.product).subscribe(res => {
        // let resData=JSON.parse(JSON.stringify(res))
        if (res.message === 'success') {

          // console.log('success');
          this._toastr.warning('Inserted successfully', 'Success!')
          this.getAllProducts();
        }
        else {
          console.log('error');
        }
      })
    } else {
      // Update Product
      this._service.updateProduct(this.product._id, this.product).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
         
          // alert('success');
          this._toastr.success('Update successfully', 'Update!')

          this.onReset()
          this.getAllProducts()
        }
        else {
          alert(resData.message);
        }
      })
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
          this._toastr.success('Delete successfully','Delete!')

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
