import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetProductComponent } from './admin/get-product/get-product.component';
import { GetBlogComponent } from './admin/get-blog/get-blog.component';
import { AdminComponent } from './admin/admin.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  {
    path: '', redirectTo: '/signin', pathMatch: 'full'
  },
  {path:'Admin', component: AdminComponent},
  {
    path: 'get-product', component: AdminComponent,
    children: [{ path: '', component: GetProductComponent }]
  },
  {
    path: 'get-blog', component: AdminComponent,
    children: [{ path: '', component: GetBlogComponent }]
  },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }