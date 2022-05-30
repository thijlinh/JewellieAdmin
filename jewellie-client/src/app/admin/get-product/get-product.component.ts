import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { Service } from 'src/app/services/services.service';
// import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
  
})
export class GetProductComponent implements OnInit {

  // public testForm = this._formBuilder.group({
  //   name: ['', [Validators.required, Validators.minLength(3)]],
  //   file: ['']
  // })



  showFiller = false;

  products: any;
  product: Product=new Product();
  errorMessage: string = "";
  file: any = null;

  constructor(private _service: Service,private activatedRoute: ActivatedRoute, private router: Router,  private _toast:ToastrService ) {}

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
  submitForm(form: NgForm){

    if(this.product._id ==''){
      this._service.postProduct(this.product).subscribe(res => {
        // let resData=JSON.parse(JSON.stringify(res))
        if (res.message === 'success') {

          // console.log('success');
          this._toast.warning('Inserted successfully', 'Success!')
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
          this._toast.success('Update successfully', 'Update!')

          this.onReset()
          this.getAllProducts()
        let resData = JSON.parse(JSON.stringify(res));
           if (resData.message === "success"){
            this._toast.success("Insert Successfully!", "Success!");
             this.getAllProducts();
           }else{
             alert("Fail!")
          }
        }})
      }
      
    }

    // onSelectFile(event:any){
    //   if ( event.target.files.length > 0){
    //     // console.log("File info: ",event.target.files[0])
    //     this.file = event.target.files[0];
    //   }else{
    //     this.file = null;
    //   }
    //   }
      
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

  // get nameInput(){
  //   return this.testForm.controls["name"]
  // }


}
