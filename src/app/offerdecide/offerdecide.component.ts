import { Component, OnInit } from '@angular/core';
import {Appli} from "../model/appli";
import {Student, User, Partner} from "../model/user";
import {Headers, Http} from "@angular/http";
import {SharedService} from "../app.service";
import {Offer} from "../model/offer";

@Component({
  selector: 'app-offerdecide',
  templateUrl: './offerdecide.component.html',
  styleUrls: ['./offerdecide.component.css']
})
export class OfferdecideComponent implements OnInit {
  candidates: Appli[] = [];
  studentList: Student[] = [];
  offerCible: Offer;
  //chosen object
  studentCible: Student = null;

  candidateProfile: User = null;
  partner: Partner;

  //variable for display things
  showDetails:boolean = false;
  indexStudentCible:number = null;
  showProfile:boolean = false;

  //for http request
  urlOMS: string;
  urlAMS: string;

  constructor(private http: Http, private sharedService: SharedService) {
    this.studentList.push(new Student(1,"NGUYEN Phu Thanh","Student","ptnguyen",null,5,[],null,null));
    this.studentList.push(new Student(2,"fdfdsf Phu Thanh","Student","ptnguyen",null,5,[],null,null));
    this.studentList.push(new Student(3,"fdfsd Phu Thanh","Student","ptnguyen",null,5,[],null,null));
  }

  //get candidate: offer object -> offer ID -> application list
  getCandidates = function() {
    /*var offerID = this.offerCible.id;
     //sent offerID to AMS to get application list
     var json = JSON.stringify({'offerID': offerID});
     console.log(json);
     var headers = new Headers();
     headers.append('Content-type', 'application/json');
     this.http.post(this.urlAMS, json, {headers: headers})
     .map(res => res.json())
     .subscribe(
     data => {
     console.log(data);
     this.candidates = JSON.parse(data);
     this.getStudentList();
     console.log(this.candidates);
     },
     error => console.log(error)
     )*/
  }

  //get student list: application list -> list student
  getStudentList = function() {
    //application list -> list student
    var json = JSON.stringify(this.candidates);
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlAMS, json, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.studentList = JSON.parse(data);
          console.log(this.studentList);
        },
        error => console.log(error)
      )
  }

  setCandidateCible(student: Student, index:number) {
    this.studentCible = student;
    this.indexStudentCible = index;
    this.showProfile = true;
  }

  isSelectedStudent = function(index:number){
    if (this.indexStudentCible == index){
      return "active";
    } else return "";
  }

  //decide a response to candidate
  candidateResponse = function(decison:string) {
    //change statement of application: send [studentId and offer Id]
    var requestContent = {
      'studentId': this.studentCible,
      'offerId': this.offerCible,
      'decision': decison,
      'partnerId': this.sharedService.getUser().id
    }
    var json = JSON.stringify(requestContent);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlAMS, json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
        },
        error=>console.log(error)
      )
  }

  ngOnInit() {
    //if (this.sharedService.getUser() != null)
    this.partner = this.sharedService.getUser();
    this.offerCible = this.sharedService.getOfferCible();
    //else location.href = "http://localhost:4200/";
  }

}
