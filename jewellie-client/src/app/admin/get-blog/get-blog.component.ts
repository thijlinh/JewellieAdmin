import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/services/services.service';
import { Blog } from 'src/app/models/blogs';

@Component({
  selector: 'app-get-blog',
  templateUrl: './get-blog.component.html',
  styleUrls: ['./get-blog.component.css']
})
export class GetBlogComponent implements OnInit {

  blogs: any;
  blog: Blog=new Blog();
  errorMessage: string = "";
  file: any = null;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private _service:Service, private _toast: ToastrService) { }

  ngOnInit(): void {
    this.getAllBlogs();
  }

  submitForm(form: NgForm){

    if(this.blog._id ==''){
      this._service.postBlog(this.blog).subscribe(res => {
        // let resData=JSON.parse(JSON.stringify(res))
        if (res.message === 'success') {

          // console.log('success');
          this._toast.warning('Inserted successfully', 'Success!')
          this.getAllBlogs();
        }
        else {
          console.log('error');
        }
      })
    } else {
      // Update Blog
      this._service.updateBlog(this.blog._id, this.blog).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
         
          // alert('success');
          this._toast.success('Update successfully', 'Update!')

          this.onReset()
          this.getAllBlogs()
        let resData = JSON.parse(JSON.stringify(res));
           if (resData.message === "success"){
            this._toast.success("Insert Successfully!", "Success!");
             this.getAllBlogs();
           }else{
             alert("Fail!")
          }
        }})
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
  onEdit(data: Blog) {
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
    if (confirm("are you sure want to delete this blog?")==true) {
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
    this._service.getBlogs().subscribe({
      next: data => this.blogs = data,
      error: err => this.errorMessage = err
    })
  }

}
