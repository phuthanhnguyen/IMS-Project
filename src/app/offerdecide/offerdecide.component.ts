import { Component, OnInit } from '@angular/core';
import {Appli} from "../model/appli";
import {Student, User, Partner} from "../model/user";
import {Headers, Http} from "@angular/http";
import {SharedService} from "../app.service";
import {Offer} from "../model/offer";
import {hasIndexFile} from "angular-cli/utilities/get-dependent-files";

@Component({
  selector: 'app-offerdecide',
  templateUrl: './offerdecide.component.html',
  styleUrls: ['./offerdecide.component.css']
})
export class OfferdecideComponent implements OnInit {
  candidates: Appli[] = [];
  studentList: Student[] = [];
  applicationList: Appli[] = [];
  downloadCV:string=null;
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
  urlAMS: string = 'http://'+this.sharedService.getAdr()+':3000/getcandidates';
  urlAMSDecide: string = 'http://'+this.sharedService.getAdr()+':3000/setdecision';

  constructor(private http: Http, private sharedService: SharedService) {
    this.partner = this.sharedService.getUser();
    this.offerCible = this.sharedService.getOfferCible();
    this.getApplications();
    this.getCandidates();
  }

  //get applications
  getApplications = function(){
    var offerID = this.offerCible.id;
    //sent offerID to AMS to get application list
    var json = JSON.stringify({'offerId': offerID});
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('http://'+this.sharedService.getAdr()+':3000/getapplications', json, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          var applications = data;
          for (var i=0; i<applications.length; i++){
            this.applicationList.push(applications[i]);
          }
          console.log(this.applicationList);
        },
        error => console.log(error)
      )
  }

  //get candidate: offer object -> offer ID -> application list
  getCandidates = function() {
     var offerID = this.offerCible.id;
     //sent offerID to AMS to get application list
     var json = JSON.stringify({'offerId': offerID});
     console.log(json);
     var headers = new Headers();
     headers.append('Content-type', 'application/json');
     this.http.post(this.urlAMS, json, {headers: headers})
     .map(res => res.json())
     .subscribe(
       data => {
         console.log(data);
         var students = data;
         for (var i=0; i<students.length; i++){
           this.studentList.push(new Student(students[i].id,students[i].name,students[i].group,students[i].username,null,students[i].year,students[i].cvs,students[i].email,students[i].pathway));
         }
         console.log(this.studentList);
       },
       error => console.log(error)
     )
  }

  //getApplications
  setCandidateCible(student:Student, index:number) {
    this.studentCible = student;
    this.indexStudentCible = index;
    this.getCv();
    this.showProfile = true;
  }

  isSelectedStudent = function(index:number){
    if (this.indexStudentCible == index){
      return "active";
    } else return "";
  }

  //decide a response to candidate
  candidateResponse = function(decision:string) {
    //get application
    var applicationId = this.getApplicationId(this.studentCible.id);
    console.log(applicationId);
    //change statement of application: send [studentId and offer Id]
    var requestContent = {
      'auth': this.sharedService.getAutho(),
      'applicationId': applicationId,
      'decision': decision
    }
    var json = JSON.stringify(requestContent);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlAMSDecide, json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
          alert("You "+decision+"ed the candidate!!!");
        },
        error=>console.log(error)
      )
  }

  getApplicationId = function(studentId: string){
    console.log(this.applicationList);
    for (var i=0; i<this.applicationList.length; i++){
      console.log(this.applicationList[i].idStudent);
      console.log(studentId);
      if(this.applicationList[i].idStudent == studentId){
        return this.applicationList[i].id;
      }
    }
  }

  getCv = function(){
    var url = 'http://'+this.sharedService.getAdr()+':3000/getAppFromStudentID';
    var json = {
      'auth':this.sharedService.getAutho(),
      'studentId':this.studentCible.id,
      'offerId':this.sharedService.getOfferCible().id
    };

    this.downloadCV = 'http://10.32.1.191:8080/IMS-war/resources/applications?idStudent='+json.studentId+'&idOffer='+json.offerId;
    /*var sendJson = JSON.stringify(json);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(url, sendJson, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.downloadCV = data;
        },
        error=>console.log(error)
      )*/
  }


  ngOnInit() {
    //if (this.sharedService.getUser() == null)
    // location.href = "http://localhost:4200/";
  }

}
