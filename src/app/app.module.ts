import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AddOrUpdateCategoryComponent } from './add-or-update-category/add-or-update-category.component';
import { WorkoutService } from './workout.service';

import { MatDialogModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginComponent } from './login/login.component';
import { fakeBackEndProvider } from '../app/helpers';
import { JwtInterceptor, ErrorInterceptor } from '../app/helpers';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    AddOrUpdateCategoryComponent,
    LoginComponent
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AlertModule.forRoot(),
    NgxPaginationModule,
    MatDialogModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  exports: [
    OverlayModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
    fakeBackEndProvider,
    WorkoutService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryComponent,
    AddOrUpdateCategoryComponent
  ]
})
export class AppModule { }

