import { Component, OnInit } from '@angular/core';

interface Category {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  id: number;
  image: string;
  name: string;
  category: string;
  price: string;
  warehouse: string;
  edit: string;
  delete: string;

}


const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, image: '', name: "", category: '', price: "", warehouse: "", edit: "", delete: ""},
];

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})


export class GetProductComponent implements OnInit {

  foods: Category[] = [
    {value: 'category-0', viewValue: 'Category 1'},
    {value: 'category-1', viewValue: 'Category 2'},
    {value: 'category-2', viewValue: 'Category 3'},
  ];

  displayedColumns: string[] = ['id', 'image', 'name', 'category', 'price', 'warehouse', 'edit', 'delete'];
  // columnsToDisplay = ['id', 'image', 'name', 'category', 'price', 'warehouse', 'edit', 'delete'];
  dataSource = ELEMENT_DATA;
  
  constructor() {
   }

  ngOnInit(): void {
  }

}
