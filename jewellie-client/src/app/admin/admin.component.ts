import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/services/services.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _router:Router, private _userSerivce: UserServiceService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
  }





}
