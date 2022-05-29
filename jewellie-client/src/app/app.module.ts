import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { MatSliderModule } from '@angular/material/slider';
// import { MatDrawerContainer } from '@angular/material/sidenav';
// import { MatIcon } from '@angular/material/icon';
// import { MatDrawer } from '@angular/material/sidenav';
// import { RouterOutlet } from '@angular/router';



import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';


import { AddProductComponent } from './add-product/add-product.component';
import { GetBlogComponent } from 'src/app/admin/get-blog/get-blog.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminComponent } from './admin/admin.component';
import { Service } from './services/services.service';
import { GetProductComponent } from './admin/get-product/get-product.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
  AppComponent,
  GetProductComponent,
  AddProductComponent,
  GetBlogComponent,
  SignInComponent,
    [
      AddProductComponent,
      AdminComponent,
      GetBlogComponent,
      GetProductComponent
    ],
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    HttpClientModule,
    MatSliderModule,
    FormsModule,


    // MatDrawerContainer,
    // MatIcon,
    // MatDrawer,
    // RouterOutlet,

    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation:'increasing',
      preventDuplicates:true
    }),
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
