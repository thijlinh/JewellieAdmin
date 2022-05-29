import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product'
import { Service } from 'src/app/services/services.service';

@Component({
  selector: 'app-get-blog',
  templateUrl: './get-blog.component.html',
  styleUrls: ['./get-blog.component.css']
})
export class GetBlogComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private _service:Service, private _toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
