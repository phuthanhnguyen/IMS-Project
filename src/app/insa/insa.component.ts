import { Component, OnInit } from '@angular/core';
import {SharedService} from "../app.service";

@Component({
  selector: 'app-insa',
  templateUrl: './insa.component.html',
  styleUrls: ['./insa.component.css']
})
export class InsaComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  logout = function(){
    this.sharedService.setAutho(null);
    this.sharedService.setUser(null);
    location.href = "http://localhost:4200/";
  }

  ngOnInit() {
  }

}
