import { Component, OnInit } from '@angular/core';
import {SharedService} from "../app.service";
import {User, Student} from "../model/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private  sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.getUser();
  }

}
