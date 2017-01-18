///<reference path="../../../node_modules/@angular/http/src/headers.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {SharedService} from "../app.service";
import {User, Partner, Insa, Admin, Student} from '../model/user';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
  selector: 'ims-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //model for the form
  username: string;
  password: string;
  //connected user instance
  userLogin: any;

  constructor(private http: Http, private sharedService: SharedService, private router: Router) {
  }

  signin() {
    if (this.username !== null && this.password !== null) {
      var autho = btoa(this.username+':'+this.password);
      this.sharedService.setAutho(autho);
      var json = JSON.stringify({"auth": this.sharedService.getAutho()});
      var headers = new Headers();
      headers.append('Content-type','application/json');
      this.http.post('http://localhost:3000/login',json,{headers: headers})
        .map(res => res.json())
        .subscribe(
          data=> {
            console.log(data);
            if (data == null){
              alert("Your password is wrong!");
            } else {
              //go to the interface of user model
              switch (data.group){
                case "STUDENT":
                  //if the username and password correct
                  this.userLogin = new Student(data.id,data.name,data.group,data.username,null,data.year,data.cvs,data.email,data.pathway);
                  //update user and offerlist models
                  this.sharedService.setUser(this.userLogin);
                  this.router.navigate(["/student"]);
                  break;
                case "PARTNER":
                  //if the username and password correct
                  this.userLogin = new Partner(data.id,data.name,data.group,data.username,null,data.name,data.email);
                  //update user and offerlist models
                  this.sharedService.setUser(this.userLogin);
                  this.router.navigate(["/partner"]);
                  break;
                case "CLASS_COORDINATOR":
                  //if the username and password correct
                  this.userLogin = new Insa(data.id,data.name,data.group,data.username,null,data.email);
                  //update user and offerlist models
                  this.sharedService.setUser(this.userLogin);
                  this.router.navigate(["/insa"]);
                  break;
                case "admin":
                  //if the username and password correct
                  this.userLogin = new Admin(data.id,data.group,data.username);
                  //update user and offerlist models
                  this.sharedService.setUser(this.userLogin);
                  this.router.navigate(["/admin"]);
                  break;
                default:
                  console.error("user without specified type");
              }
            }
          },
          error=> console.log(error)
        )
   } else alert("Username or password are missing!!!");
  }

  ngOnInit() {
  }
}
