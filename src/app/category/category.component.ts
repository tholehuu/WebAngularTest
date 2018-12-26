import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddOrUpdateCategoryComponent } from '../add-or-update-category/add-or-update-category.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  p:number = 1;
  itemsPage:number = 10;
  @Output() recordDeleted = new EventEmitter<any>();
  @Output() newClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  @Input() categoryData: Array<any>;
  @Output() cateCreated=new EventEmitter<any>();

  id:string;
  name: string;

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }

  public deleteRecord(record){
    //console.log(record);
    this.recordDeleted.emit(record);
  }

  public editRecord(record){
    const cloneRecord = Object.assign({},record);
    //console.log(record);
    this.editClicked.emit(cloneRecord);
    this.id=cloneRecord.id;
    this.name=cloneRecord.name;
    this.OpenDialog('350px','350px');
  }
  /**
   * OpenDialog
   */
  public OpenDialog(sheight: string, swidth: string) {
    const dialogRef =this.dialog.open(AddOrUpdateCategoryComponent,
      {
        width: swidth,
        height: sheight,
        data: { name: this.name, id: this.id}
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log("The dialog was closed");
        //console.log(result);
        this.cateCreated.emit(result);
      });
  }
  public newRecord(){
    this.newClicked.emit(); 
    this.id=null;
    this.name=null;
    this.OpenDialog('250px','350px');   
  }
}
