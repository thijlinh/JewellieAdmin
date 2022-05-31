import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Blog } from 'src/app/models/blog';
import { Service } from 'src/app/services/services.service';

@Component({
  selector: 'app-get-blog',
  templateUrl: './get-blog.component.html',
  styleUrls: ['./get-blog.component.css']
  
})
export class GetBlogComponent implements OnInit {
  blogs: Blog[]= [];
  blog: Blog=new Blog();
  errorMessage: string = "";
  
  constructor(private _service: Service, private _toast:ToastrService
    ) {   }
  ngOnInit(): void {
    
    this.getAllBlogs()
  }
  

  // Xử lý form update
  // Submit
  submitForm(form: NgForm){
    if(this.blog._id ==''){
      this._service.postBlog(this.blog).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res));
           if (resData.message === "success"){
            this._toast.success("Insert Successfully!", "Success!");
             this.getAllBlogs();
           }else{
             alert("Fail!")
          }
            })
          }
    else{
      this._service.updateBlog(this.blog._id, this.blog).subscribe(res =>{
        let resData = JSON.parse(JSON.stringify(res));
        if(resData.message === "success"){
          // alert("Updated Successfully!");
          this._toast.success("Updated Successfully!", "Success!");
          this.onReset();
          this.getAllBlogs();
        }else{
          alert("fail");
        }
      });
    
    }
      
    }

  // Nút edit 
  onEdit(data:Blog) {
      this.blog=data;
  }
  onReset(form?: NgForm) {
    if (form) {
      form.reset();
    } 
    this.blog= new Blog();
  }
  // delete
  onDelete(id: any, form: NgForm) {
    if (confirm("are you sure want to delete this product?")==true) {
      this._service.deleteBlog(id).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
          // alert('Delete successfully');
          this._toast.success('Delete successfully','Delete!')

          this.onReset(form)
          this.getAllBlogs()
        }
        else {
          alert(resData.message);
        }
      })
    }
  }
  
  // Xử lý load table
  getAllBlogs() {
    this._service.getBlogs()
    .subscribe({
      next: data => this.blogs = data,
      error: err => this.errorMessage = err
    })
    
  }
}