import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public userData: Array<any>;

  constructor(
    private workoutService: WorkoutService
  ) {
    workoutService.GetAllUsers().subscribe((data:any) => this.userData=data);
  }

  ngOnInit() {
  }

}
