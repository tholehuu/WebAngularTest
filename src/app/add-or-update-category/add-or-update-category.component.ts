import { Component, EventEmitter, Input, Output, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryComponent } from '../category/category.component';
import { $ } from 'protractor';

export interface DialogData{
  id: string;
  name: string;
  index: string;
}

@Component({
  selector: 'app-add-or-update-category',
  templateUrl: './add-or-update-category.component.html',
  styleUrls: ['./add-or-update-category.component.css']
})
export class AddOrUpdateCategoryComponent implements OnInit {
  @Output() cateCreated=new EventEmitter<any>();
  @Input() category: any;

  public buttonText='Save';

  constructor(public dialogRef: MatDialogRef<CategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.clearCategory();
    if(this.data.id!=null)
    {
      this.category=data;
    }
  }



  ngOnInit() {
  }

  private clearCategory=function()
  {
    //create an empty category object
    this.category={
      id: undefined,
      name: ''
    };
  }
  onNoClick= function() {
    this.dialogRef.close();
  }

  public onKeyDown=function(event){
      this.addOrUpdateCategoryRecord();
  }

  public addOrUpdateCategoryRecord = function(event){
    console.log(this.category);
    this.cateCreated.emit(this.category);
    this.clearCategory();
    this.onNoClick();
  }

}
