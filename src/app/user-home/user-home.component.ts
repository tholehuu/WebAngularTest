import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { UserService } from '../service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public userData: Array<any>;
  public currentUser: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private workoutService: WorkoutService
  ) {
    workoutService.GetAllUsers().subscribe((data:any) => this.userData=data);
  }

  ngOnInit() {
      this.userService.getAll();
  }

  private setInitialValuesForUserData(){
    return{
      id:undefined,
      username:'',
      pasword:'',
      firstname:'',
      lastname:'',
      token:'',
      isactve:1
    }
  }

  private GetAllUsers() {
    this.workoutService.GetAllUsers().subscribe((data:any) => this.userData=data);
  }

  public createOrUpdateUser = function(user:any ) {
    if(user!=null)
    {
      let userWithId;
      userWithId = _.find(this.userData, (us => us.id === user.id));
      if(userWithId)
      {
        const updateIndex= _.findIndex(this.userData, {id: userWithId});
        this.workoutService.UpdateUser(user).subscribe(
          userRecord => {
            //console.log(user);
            //this.userData.splice(updateIndex,1,user);
            this.GetAllUsers();
          }
        );
      }
      else
      {
        this.workoutService.AddUser(user).subscribe(
          userRecord => {
            this.GetAllUsers();}
        );
      }
    }else
    {
      console.log("user dang co gia tri null!!!!!");
    }
    this.currentUser=this.setInitialValuesForUserData();
  }

  public editClicked = function(record){
    this.currentUser=record;
  } 

  public newClicked = function(record){
    this.currentUser=this.setInitialValuesForUserData();
  }

  public deleteClicked(record){
    const deleteIndex = _.findIndex(this.userData,{id:record.id});
    this.workoutService.DeleteUser(record).subscribe(
      result => this.userData.splice(deleteIndex,1)
    );
  }
}
