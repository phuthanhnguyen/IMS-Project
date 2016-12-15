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
  //display purpose
  show:boolean = false;
  constructor(private http: Http, private sharedService: SharedService, private router: Router) {
  }

  signin() {
    //if (this.username !== null && this.password !== null) {
      console.log('login');
      var json = JSON.stringify({"username": this.username, "password": this.password});
      var authen = btoa(this.username+':'+this.password);
      var headers = new Headers();
      headers.append('Content-type','application/json');
      //headers.append('Authorization', 'Basic '+authen);
      //this.http.get('https://10.32.2.63:8181/IMS-war/ws/hello',{headers: headers})
      //this.http.get('http://10.32.2.37:8080/IMS-war/resources/hello/login',{headers: headers})
      this.http.post('http://localhost:3000/login',json,{headers: headers})
      //this.http.get('http://10.32.2.37:8080/PartnerOffers/resources/partnerrest',{headers: headers})
        .map(res => res.json())
        .subscribe(
          data=> {
            if (data == null){
              alert("Your password is wrong!");
            } else {
              console.log(data);
              //go to the interface of user model
              switch (data.type){
                case "Student":
                  //if the username and password correct
                  this.userLogin = new Student(data.id,data.lastName,data.firstName,data.type,data.username,null,data.year,data.offerApplied);
                  //update user and offerlist models
                  this.sharedService.setUser(this.userLogin);
                  this.sharedService.setOffers(this.userLogin.offerApplied);
                  this.router.navigate(["/student"]);
                  break;
                case "Partner":
                  //if the username and password correct
                  this.userLogin = new Partner(data.id,data.lastName,data.firstName,data.type,data.username,null,data.company);
                  //update user and offerlist models
                  this.sharedService.setUser(this.userLogin);
                  this.router.navigate(["/partner"]);
                  break;
                case "INSA":
                  //if the username and password correct
                  this.userLogin = new Insa(data.id,data.lastName,data.firstName,data.type,data.username,null);
                  //update user and offerlist models
                  this.sharedService.setUser(this.userLogin);
                  this.router.navigate(["/insa"]);
                  break;
                case "admin":
                  //if the username and password correct
                  this.userLogin = new Admin(data.id,data.type,data.username,data.password);
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
   // } else alert("Username or password are missing!!!");
  }

  showLearnMore = function(){
    this.show = !this.show;
  }

  ngOnInit() {
  }
}
