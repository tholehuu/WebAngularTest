import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      const currentUser = this.authenticationService.currentUserValue;
      if(currentUser)
      {
        return true;
      }
      this.router.navigate(['/login'],{
       queryParams: { returnUrl:state.url }
      });
      return false;
  }
}
