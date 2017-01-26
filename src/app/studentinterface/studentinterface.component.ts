import { Component, OnInit } from '@angular/core';
import {SharedService} from "../app.service";
import {User} from "../model/user";


@Component({
  selector: 'app-studentinterface',
  templateUrl: './studentinterface.component.html',
  styleUrls: ['./studentinterface.component.css']
})

export class StudentinterfaceComponent implements OnInit {
  user: User;
  selectedTab:number=1;

  constructor(private sharedService: SharedService) {
  }

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
    location.href = 'http://'+this.sharedService.getAdr()+':4200/';
  }

  ngOnInit() {
    if (this.sharedService.getUser() != null)
      this.user = this.sharedService.getUser();
    else location.href = 'http://'+this.sharedService.getAdr()+':4200/';
  }
}
