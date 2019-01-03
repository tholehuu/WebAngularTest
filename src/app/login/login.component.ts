import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private workoutService: WorkoutService
  ) { 
    workoutService.GetAllUsers().subscribe((data:any) => this.users=data);
  }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {return this.loginForm.controls;}

  onSubmit(){
    this.submitted = true;
    sessionStorage.setItem("users",JSON.stringify(this.users));
    if(this.loginForm.invalid){
      console.log(this.loginForm.invalid);
      return;
    }

    this.loading =true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error= error;
          this.loading = false;
        }
      );
  }
  public resetValue(){
   this.loginForm.reset();
  }

}
