import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpResponse,
HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models';
import { WorkoutService } from '../workout.service';
import { ok } from 'assert';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, 
        next: HttpHandler,): Observable<HttpEvent<any>>{
            /*const users: User[]=[
                { id: 1, username: 'test', 
                password: 'test', firstName: 'Test',
                lastName: 'User' }
            ];*/
            let lsusers: any[]= JSON.parse(sessionStorage.getItem("users"))||[];
            let users: User[]=[];
            for(var i=0; i < lsusers.length;i++){
                var u = lsusers[i];
                var item: User={ 
                    id: u.id,
                    username: u.userName,
                    password: u.password,
                    firstName: u.firstName,
                    lastName: u.lastName
                 };
                users.push(item);
            };
            const authHeader = request.headers.get('Authorization');
            const isLoggedIn = authHeader && 
            authHeader.startsWith('Bearer fake-jwt-token');
            return of(null).pipe(
                mergeMap(()=>{
                    if(request.urlWithParams.endsWith('/users/authenticate') && request.method === 'POST')
                    {
                        const user=users.find(x => x.username === request.body.username &&
                            x.password === request.body.password);
                            if(!user) return  error('Username or password is incorrect');
                            return ok({
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: `fake-jwt-token`
                            });

                    }
                    if(request.url.endsWith('/users') && request.method === 'GET')
                    {
                        if(!isLoggedIn) return unauthorised();
                        return ok(users);
                    }
                    return next.handle(request);
                }
                )
            ).pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
                
            
        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackEndProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

