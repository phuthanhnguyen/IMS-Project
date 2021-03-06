import { Component, OnInit } from '@angular/core';
import {User, Insa, Student, Partner} from '../model/user';
import {Http, Headers} from '@angular/http';
import {Offer} from "../model/offer";
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {
  newUser: User;
  lastName:string = null;
  firstName:string = null;
  username:string = null;
  password:string = null;
  type:string = null;
  //for student
  year:number = null;
  //for partner
  company:string = null;
  userList: User[];
  isWhichUser:number; //0: student, 1: insa, 2: partner
  validateForm: boolean;
  indexSelected:number;

  constructor(private http: Http) {
    this.getUserList();
  }

  setTemplate = function(num:number){
    this.isWhichUser=num;
  }

  createAccount = function(){
    switch (this.type){
      case "Student":
        this.validateForm = this.lastName && this.firstName && this.type && this.username && this.year && this.password;
        if (this.validateForm)
          this.newUser = new Student(null,this.lastName,this.firstName,this.type,this.username,this.password,this.year,[]);
        else return alert("Please insert every informations");
        break;
      case "INSA":
        this.validateForm = this.lastName && this.firstName && this.type && this.username,this.password;
        if (this.validateForm)
          this.newUser = new Insa(null,this.lastName,this.firstName,this.type,this.username,this.password);
        else return alert("Please insert every informations");
        break;
      case "Partner":
        this.validateForm = this.lastName && this.firstName && this.type && this.username && this.password;
        if (this.validateForm)
          this.newUser = new Partner(null,this.lastName,this.firstName,this.type,this.username,this.password,this.company);
        else return alert("Please insert every informations");
        break;
      default:
        alert("Please choose a type!");
        break;
    }

    if (this.validateForm){
      var json = JSON.stringify(this.newUser);
      console.log(json);
      var params = json;
      var headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.post('http://localhost:3000/createuser', params,{headers: headers})
        .map(res => res.json())
        .subscribe(
          data=>{
            console.log(data);
            this.resetComponent();
            this.getUserList();
          },
          error=> console.log('error')
        );
    }
  }

  getUserList = function(){
    var headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get('http://localhost:3000/getuserlist', {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this.userList = JSON.parse(data);
          console.log(data);
        },
        error => console.log('error')
      )
  }

  resetComponent = function(){
    this.username = null;
    this.password = null;
    this.year = null;
    this.type = null;
    this.lastName = null;
    this.firstName = null;
    this.newUser = null;
    this.company = null;
  }

  //markable selection
  selectItem = function(index:number){
    this.indexSelected = index;
  }

  isSelected = function(index:number){
    if (this.indexSelected == index){
      return "darkgray";
    } else return "";
  }

  ngOnInit() {
  }

}
