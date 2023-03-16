import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { httpInterceptorProviders } from './Auth/services/auth-interceptor';
import { ClientComponent } from './components/client/client.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxTranslateModule } from './translate/translate.module';
import { TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    LoginComponent,
    RegisterComponent,
    ClientComponent,
    ProfileComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    HttpClientModule,
    InplaceModule,
    InputTextModule,
    PasswordModule,
    CalendarModule,
    ToastModule,
    NgxTranslateModule,
    DialogModule,
    ConfirmDialogModule,
  ],
  providers: [
    httpInterceptorProviders,
    MessageService,
    ConfirmationService,
    TranslateService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
