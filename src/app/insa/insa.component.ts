import { Component, OnInit } from '@angular/core';
import {SharedService} from "../app.service";

@Component({
  selector: 'app-insa',
  templateUrl: './insa.component.html',
  styleUrls: ['./insa.component.css']
})
export class InsaComponent implements OnInit {
  selectedTab:number=1;

  constructor(private sharedService: SharedService) { }

  setTab = function(tab: number){
    this.selectedTab = tab;
  }

  getTab = function(tab: number){
    if (this.selectedTab == tab){
      return "active";
    } else return "";
  }

  logout = function(){
    this.sharedService.setAutho(null);
    this.sharedService.setUser(null);
    location.href = "http://localhost:4200/";
  }

  ngOnInit() {
  }

}
