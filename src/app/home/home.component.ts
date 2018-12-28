import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import * as _ from 'lodash';
import { UserService,AuthenticationService } from '../service';
import { User } from '../models';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categoryData: Array<any>;
  public currentCategory: any;
  public users: User[] = [];


  constructor(private userService: UserService,private workoutService: WorkoutService) {
      this.currentCategory=this.setInitialValuesForCategoryData();
      workoutService.getAllCategory().subscribe((data:any) => this.categoryData=data);
      if(typeof this.categoryData=="undefined")
      {
        
      }
      
  }
   
  ngOnInit() {
    /*this.userService.getAll().pipe(first()).subscribe(users => {
      this.users=users;
    });*/
    this.userService.getAll();
  }
  
  private setInitialValuesForCategoryData(){
    return {
      id:undefined,
      name:''
    }
  }

  
  

  private GetAllCategories(){
    this.workoutService.getAllCategory().subscribe((data:any) => this.categoryData=data);
    
  }

  public createOrUpdateCategory = function(cate: any){
    //console.log(this.flagHttps);
    //if category is present in categoryData, we can assume this is an update
    //otherwise it is adding a new element
    if(cate!=null)
    {
      let categoryWithId;
      categoryWithId= _.find(this.categoryData, (el => el.id === cate.id));
      if(categoryWithId)
      {
        const updateIndex= _.findIndex(this.categoryData, {id:categoryWithId.id});
        this.workoutService.updateCategory(cate).subscribe(
          categoryRecord => {
            this.categoryData.splice(updateIndex,1,cate);
            //this.GetAllCategories();
          }
        );
      }else
        {
        this.workoutService.addCategory(cate).subscribe(
          categoryRecord => {
            //this.categoryData.push(cate);
            this.GetAllCategories();
          }
        );
      }
    }
    else
    {
      console.log("category dang co gia tri null!!!!!");
    }
    this.currentCategory=this.setInitialValuesForCategoryData();
  }

  public editClicked = function(record){
    //console.log(record);
    this.currentCategory=record;
  }

  public newClicked = function(record){
    this.currentCategory=this.setInitialValuesForCategoryData();
  }

  public  deleteClicked(record){
    const deleteIndex = _.findIndex(this.categoryData,{id:record.id});
    this.workoutService.deleteCategory(record).subscribe(
      result => this.categoryData.splice(deleteIndex,1)
    );
  }
  

}
