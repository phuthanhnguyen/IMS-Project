import { Component, OnInit } from '@angular/core';
import {SharedService} from "../app.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  logout = function(){
    this.sharedService.setAutho(null);
    this.sharedService.setUser(null);
    location.href = "http://localhost:4200/";
  }

  ngOnInit() {
  }

}
