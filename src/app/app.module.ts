import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    AddOrUpdateCategoryComponent,
    
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AlertModule.forRoot(),
    NgxPaginationModule,
    MatDialogModule, 
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  exports: [
    OverlayModule
  ],
  providers: [
    WorkoutService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryComponent,
    AddOrUpdateCategoryComponent
  ]
})
export class AppModule { }

