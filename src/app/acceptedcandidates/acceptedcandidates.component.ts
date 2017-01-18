import { Component, OnInit } from '@angular/core';
import {Appli} from "../model/appli";
import {User, Student} from "../model/user";
import {Offer} from "../model/offer";
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";

@Component({
  selector: 'app-acceptedcandidates',
  templateUrl: './acceptedcandidates.component.html',
  styleUrls: ['./acceptedcandidates.component.css']
})
export class AcceptedcandidatesComponent implements OnInit {

  //models
  waitingAppliList: Appli[] = [];
  user: User;
  appliCible: Appli = null;
  offerCible: Offer = null;
  studentCible: User = null;

  //for display purpose
  showDetails:boolean = false;
  indexSelected:number;

  //define url of service
  urlDecidedAppli:string;
  urlGetStudentByID:string;
  urlGetOfferByID:string;
  urlUpdateAppli:string;

  constructor(private http: Http, private sharedService: SharedService) {
    //this.getDecidedAppli();
    //test with local application
    var appl = new Appli(1,1,1,1,"WAITING_CLASS_COORDINATOR");
    this.waitingAppliList.push(appl);
  }

  //when choose a application in the list
  setAppliCible = function(appli:Appli){
    this.appliCible = appli;
    /*this.updateStudentCible(this.urlGetStudentByID, this.appliCible);
    this.updateOfferCible(this.urlGetOfferByID, this.appliCible);*/
    //test local
    var student = new Student(1,"NGUYEN Phu Thanh","Student","ptnguyen",null,5,[],null,null);
    var offer = new Offer(2,"CGI", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com");
    this.offerCible = offer;
    this.studentCible = student;
    this.showDetails = true;
  }
  //for display
  setIndexSelected = function(index:number){
    this.indexSelected = index;
  }
  isSelected = function(index:number){
    if (this.indexSelected == index)
      return "active";
    else return "";
  }

  //get the list of application in state +-1 for partner +-2 for insa and +-3 for sfo
  getDecidedAppli = function(){
    var json = JSON.stringify(this.user);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlDecidedAppli,json,{headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=>{
          console.log(data);
          this.waitingAppliList = data;
        },
        error=>console.log(error)
      )
  }

  //make a review of this appli (show student profile, offer details)
  //for each appli get the student profile and the details of offer
  //get student cible (appli object => studentId => student object)
  updateStudentCible = function(urlGetStudentByID:string, appliCible: Appli) {
    var json = JSON.stringify({'studentId': appliCible.studentId});
    var headers = new Headers();
    headers.append('Content-type', 'application/json');

    this.http.post(urlGetStudentByID, json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data)
          this.studentCible = data;
        },
        error=>console.log(error)
      );
  }

  //get offer cible (appli object => offerId => offer object)
  updateOfferCible = function(urlGetOfferByID:string,appliCible: Appli) {
    var json = JSON.stringify({'offerId': appliCible.offerId});
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    //get offer cible
    this.http.post(urlGetOfferByID,json,{headers:headers})
      .map(res=>res.json())
      .subscribe(
        data=>{
          console.log(data)
          this.offerCible = data;
        },
        error=>console.log(error)
      );
  }

  ngOnInit() {
    if (this.sharedService.getUser() != null)
      this.user = this.sharedService.getUser();
    else location.href = "http://localhost:4200/";
  }

}
