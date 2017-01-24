import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";
import {Appli} from "../model/appli";
import {User, Student} from "../model/user";
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
  urlWaitingAppli:string = 'http://localhost:3000/getapplicationscc';
  urlGetStudentByID:string = 'http://localhost:3000/getstudentfromapp';
  urlGetOfferByID:string = 'http://localhost:3000/getOfferFromApp';

  constructor(private http: Http, private sharedService: SharedService) {
    this.getWaitingAppli();
    //test
    /*this.waitingAppliList.push(new Appli(1,1,1,1,"Waiting_cc"));
    this.waitingAppliList.push(new Appli(2,1,1,1,"Waiting_cc"));
    this.waitingAppliList.push(new Appli(3,1,1,1,"Waiting_cc"));
    this.waitingAppliList.push(new Appli(4,1,1,1,"Waiting_cc"));
    this.waitingAppliList.push(new Appli(5,1,1,1,"Waiting_cc"));
    this.waitingAppliList.push(new Appli(6,1,1,1,"Waiting_cc"));*/


  }

  isSelectedAppli = function(index:number){
    if (this.indexOfferCible == index){
      return "active";
    } else return "";
  }

  //when choose a application in the list
  setAppliCible = function(appli:Appli){
    this.appliCible = appli;
    this.updateStudentCible(this.urlGetStudentByID, this.appliCible);
    this.updateOfferCible(this.urlGetOfferByID, this.appliCible);
  }


  //get all application in state 1: accepted by partner (<=> waiting offers)
  getWaitingAppli = function(){
    var json = JSON.stringify({'auth': this.sharedService.getAutho()});
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlWaitingAppli,json,{headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=>{
          var apps = data;
          console.log(apps);
          for (var i=0; i<apps.length; i++){
            if (this.sharedService.getUser().type=="CLASS_COORDINATOR"){
              if (apps[i].state=="WAITING_CC" && apps[i].idCoordinator==this.sharedService.getUser().id)
                this.waitingAppliList.push(new Appli(apps[i].id,apps[i].idOffer,apps[i].idStudent,apps[i].idPartner,apps[i].state));
            } else if (this.sharedService.getUser().type=="FSD"){
              if (apps[i].state=="WAITING_FSD")
                this.waitingAppliList.push(new Appli(apps[i].id,apps[i].idOffer,apps[i].idStudent,apps[i].idPartner,apps[i].state));
            }

          }
          console.log(this.waitingAppliList);
        },
        error=>console.log(error)
      )
  }

  //for each appli get the student profile and the details of offer
  //get student cible (appli object => studentId => student object)
  updateStudentCible = function(urlGetStudentByID:string,appliCible: Appli) {
    var json = JSON.stringify({
      'auth': this.sharedService.getAutho(),
      'studentId': this.appliCible.studentId
    });
    var headers = new Headers();
    headers.append('Content-type', 'application/json');

    this.http.post(urlGetStudentByID, json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.studentCible = new Student(data.id,data.name,data.group,data.username,null,data.year,data.cvs,data.email,data.pathway);
        },
        error=>console.log(error)
      );
  }

  //get offer cible (appli object => offerId => offer object)
  updateOfferCible = function(urlGetOfferByID:string,appliCible: Appli) {
    var json = JSON.stringify({
      'auth': this.sharedService.getAutho(),
      'offerId': this.appliCible.offerId,
      'partnerId': this.appliCible.partnerId
    });
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    //get offer cible
    this.http.post(urlGetOfferByID,json,{headers:headers})
      .map(res=>res.json())
      .subscribe(
        data=>{
          console.log(data);
          this.offerCible = new Offer(data.ido,data.enterprise,data.dateCreation,data.dateBeginning,data.length,
            data.activityField, data.title, data.areaCode,data.location,data.missionStatement,
            data.pay,data.details,data.profile,data.contactInformations);
        },
        error=>console.log(error)
      );
  }

  //deicde to refuse or accept
  //decide a response to candidate
  candidateResponse = function(decision:string) {
    var applicationId = this.appliCible.id;
    console.log(applicationId);
    //change statement of application: send [studentId and offer Id]
    var requestContent = {
      'auth': this.sharedService.getAutho(),
      'applicationId': applicationId,
      'decision': decision
    }
    var json = JSON.stringify(requestContent);
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('http://localhost:3000/setdecision', json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
        },
        error=>console.log(error)
      )
  }

  ngOnInit() {
    /*if (this.sharedService.getUser() != null)
      this.user = this.sharedService.getUser();
    else location.href = "http://localhost:4200/";*/
  }

}
