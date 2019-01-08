import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models';
import { MatDialog } from '@angular/material';
import { AddOrUpdateUserComponent } from '../add-or-update-user/add-or-update-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  p:number = 1;
  itemsPage:number = 10;
  @Input() userData: Array<any>;
  @Output() newClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() recordDeleted = new EventEmitter<any>();
  @Output() userCreated = new EventEmitter<any>();
  private user: User;

  constructor(public dialog: MatDialog) {
    this.user=new User();
   }

  ngOnInit() {
  }

  public deleteRecord(record){
    this.recordDeleted.emit(record);
  }

  public editRecord(record){
    const clone = Object.assign({},record);
    //console.log(record);
    this.editClicked.emit(clone);
    this.user.id=clone.id;
    this.user.username=clone.userName;
    this.user.firstName=clone.firstName;
    this.user.lastName=clone.lastName;
    this.user.password=clone.password;
    this.user.token=clone.token;
    this.user.isactive=clone.isactive;
    this.OpenDialog('450px','400px');
  }

  public OpenDialog(sheight: string, swidth: string){
    const dialogRef = this.dialog.open(AddOrUpdateUserComponent,{
      width: swidth,
      height: sheight,
      data: { id: this.user.id, username:this.user.username,
              password: this.user.password ,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              token: this.user.token,
              isactive: 1
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      result.isactive=1;
      this.userCreated.emit(result);
    });
  }

  public newRecord(){
    this.newClicked.emit();
    this.user=new User();
    this.OpenDialog('450px','400px');
  }

}
