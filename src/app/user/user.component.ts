import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  p:number = 1;
  itemsPage:number = 10;
  @Input() userData: Array<any>;
  constructor() { }

  ngOnInit() {
  }

}
