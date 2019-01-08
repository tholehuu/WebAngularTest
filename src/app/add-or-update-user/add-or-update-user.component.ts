import { Component, EventEmitter, Input, Output, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserComponent } from '../user/user.component';
import { User } from '../models';

export interface DialogData{
  id:string;
  username:string;
  password:string;
  firstname:string;
  lastname:string;
}

@Component({
  selector: 'app-add-or-update-user',
  templateUrl: './add-or-update-user.component.html',
  styleUrls: ['./add-or-update-user.component.css']
})
export class AddOrUpdateUserComponent implements OnInit {
  @Output() userCreated =new EventEmitter<any>();
  @Input() user: any; 

  public buttonText="Save";

  constructor( public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
  { 
    this.clearUser();
    if(data.id != null)
    {
      //console.log(data);
      this.user=data;
    }
  }

  ngOnInit() {
  }

  private clearUser=function(){
    this.user= {
      id: undefined,
      username:'',
      password:'',
      firstname: '',
      lastname: '',
    }
  }

  onNoClick= function(){
    this.dialogRef.close();
  }

  public onKeyDown=function(event){
    this.addOrUpdateUserRecord();
}

  public addOrUpdateUserRecord = function(){
    //console.log(this.user);
    this.userCreated.emit(this.user);
    this.clearUser();
    this.onNoClick();
  }

}
