import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Auth/components/register/register.component';
import { ClientComponent } from './components/client/client.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: RegisterComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'client', component: ClientComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
