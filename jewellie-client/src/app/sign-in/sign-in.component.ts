import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor ( private _userSerivce: UserServiceService, private _router: Router) { }

  ngOnInit(): void {
  }
  onsubmit( form: NgForm){
    this._router.navigateByUrl('/get-product')
  }
}
