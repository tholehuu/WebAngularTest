import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private headers: HttpHeaders;
  private httpsUrl: string ='https://localhost:6001/api/';
  private httpUrl: string ='http://localhost:6000/api/';
  private flag: Array<any>;

  constructor(private http: HttpClient) {
      this.headers = new HttpHeaders({'Content-Type': 'application/json; chareset=utf-8'});
  }
  
  public getAllCategory(){
    //Get all category data
    var apiurl=this.httpsUrl+"GetAllCategory";
    this.CheckGetAllCategory(apiurl);
    //console.log(this.flag);
    return this.http.get(apiurl, {headers: this.headers});
  }

  public httpgetAllCategory(){
    //Get all category data
    return this.http.get(this.httpUrl+"GetAllCategory", {headers: this.headers});
  }

  

  private CheckGetAllCategory(httpUrl)
  {
    
    this.http.get(httpUrl, {headers: this.headers})
      .subscribe(
        (data:any) => 
          this.flag =data
      );
    
  }

  public addCategory(payload){
    return this.http.post(this.httpsUrl+"AddCategory",payload,{headers: this.headers});
  } 

  public httpaddCategory(payload){
    return this.http.post(this.httpUrl+"AddCategory",payload,{headers: this.headers});
  } 

  public updateCategory(payload){
    return this.http.put(this.httpsUrl+"UpdateCategory"+'/'+payload.id,payload,{headers: this.headers});
  }

  public httpupdateCategory(payload){
    return this.http.put(this.httpUrl+"UpdateCategory"+'/'+payload.id,payload,{headers: this.headers});
  }

  public deleteCategory(payload)
  {
    return this.http.delete(this.httpsUrl+"DeleteCategory"+"/"+payload.id,{headers: this.headers});
  }

  public httpdeleteCategory(payload)
  {
    return this.http.delete(this.httpUrl+"DeleteCategory"+"/"+payload.id,{headers: this.headers});
  }

  public GetAllUsers(){
    return this.http.get(this.httpsUrl+"GetAllUser",{ headers: this.headers });
  }

  public UpdateUser(payload){
    return this.http.put(this.httpsUrl+"UpdateUser"+"/"+payload.id,payload,{ headers: this.headers });
  }

  public AddUser(payload){
    return this.http.post(this.httpsUrl+"AddUser",payload,{ headers: this.headers });
  }

  public DeleteUser(payload){
    return this.http.delete(this.httpsUrl+"DeleteUser"+"/"+payload.id,{ headers: this.headers });
  }
}
