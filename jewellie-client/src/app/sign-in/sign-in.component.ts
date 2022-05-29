import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { Service } from 'src/app/services/services.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor ( private _service: Service, private _router: Router, private _toast:ToastrService) { }
  user: User = new User();

  ngOnInit(): void {
  }
  onsubmit( form: NgForm){
    console.log(this.user.username);
    console.log(this.user.password);

    this._service.authenticate(this.user).subscribe(res => {
      if (res.message === 'success') {
        this._toast.success('Success', 'Success!');
        this._router.navigateByUrl('/Admin')
      }
      else {
        const alertContent = res.message;
        this._toast.error(alertContent, 'Error!')
      }
    })

  }
}
