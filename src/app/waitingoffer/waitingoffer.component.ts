import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";
import {Appli} from "../model/appli";
import {User} from "../model/user";
import {Offer} from "../model/offer";

@Component({
  selector: 'app-waitingoffer',
  templateUrl: './waitingoffer.component.html',
  styleUrls: ['./waitingoffer.component.css']
})
export class WaitingofferComponent implements OnInit {
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
  urlWaitingAppli:string;
  urlGetStudentByID:string;
  urlGetOfferByID:string;
  urlUpdateAppli:string;

  constructor(private http: Http, private sharedService: SharedService) {
    this.user = this.sharedService.getUser();
    //this.getWaitingAppli();
  }

  //button event
  acceptAppli = function(){
    this.candidateResponse(this.urlUpdateAppli,'accept',this.appliCible);
  }
  refuseAppli = function(){
    this.candidateResponse(this.urlUpdateAppli,'refuse',this.appliCible)
  }

  //when choose a application in the list
  setAppliCible = function(index:number){
    this.appliCible = this.waitingAppliList[index];
    this.updateStudentCible(this.urlGetStudentByID, this.appliCible);
    this.updateOfferCible(this.urlGetOfferByID, this.appliCible);
  }
  //for display
  setIndexSelected = function(index:number){
    this.indexSelected = index;
  }
  isSelected = function(index:number){
    if (this.indexSelected == index)
      return "darkgray";
    else return "";
  }

  //get all application in state 1: accepted by partner (<=> waiting offers)
  getWaitingAppli = function(){
    var json = JSON.stringify(this.user);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlWaitingAppli,json,{headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=>{
          console.log(data);
          this.waitingAppliList = data;
        },
        error=>console.log(error)
      )
  }

  //for each appli get the student profile and the details of offer
  //get student cible (appli object => studentId => student object)
  updateStudentCible = function(urlGetStudentByID:string,appliCible: Appli) {
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

  //deicde to refuse or accept
  //change statement of the appli to 2 when insa accept and -2 when insa refuse
  candidateResponse = function(urlUpdateAppli:string,decide:string, appliCible: Appli){
    var json = JSON.stringify({
      'appliId': appliCible.id,
      'decide': decide
    });
    var headers = new Headers();
    headers.append('Content-type', 'application/json');

    //get offer cible
    this.http.post(urlUpdateAppli,json,{headers:headers})
      .map(res=>res.json())
      .subscribe(
        data=>{
          console.log(data)
        },
        error=>console.log(error)
      );
  }

  ngOnInit() {
  }

}
