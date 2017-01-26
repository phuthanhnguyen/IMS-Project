import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";
import {Student} from "../model/user";
import {Offer} from "../model/offer";
import map = webdriver.promise.map;
import {Appli} from "../model/appli";

@Component({
  selector: 'app-appliedoffers',
  templateUrl: './appliedoffers.component.html',
  styleUrls: ['./appliedoffers.component.css']
})
export class AppliedoffersComponent implements OnInit {
  user: Student;
  offerCible: Offer = null;
  applicationCible: Appli = null;
  //display purpose
  appliStatement:number=null;
  showContent: boolean = false;

  //model list to show on template
  appliedOfferList: Offer[] = [];
  applicationList: Appli[] = [];

  //define the url of the service
  urlAppliService:string =null;

  constructor(private http: Http, private sharedService: SharedService) {
    this.urlAppliService = 'http://'+this.sharedService.getAdr()+':3000/appliedoffers';
    this.user = this.sharedService.getUser();
    console.log(this.user);

    this.getApplications();
  }

  setStatement(statement:string){
    if (statement=="WAITING_PARTNER")
      this.appliStatement=0;
    if (statement=="WAITING_CC")
        this.appliStatement=1;
    if (statement=="WAITING_FSD")
        this.appliStatement=2;
    if (statement=="REFUSED_CC")
      this.appliStatement=3;
    if (statement=="REFUSED_PARTNER")
      this.appliStatement=4;
    if (statement=="REFUSED_FSD")
      this.appliStatement=5;
    if (statement=="CANCELLED_STUDENT")
      this.appliStatement=6;
    if (statement=="ACCEPTED")
      this.appliStatement=7;
    console.log(this.appliStatement);
  }

  setOfferCible(index){
    this.offerCible = this.appliedOfferList[index];
    this.updateAppliCible(this.offerCible.id);
    console.log(this.applicationCible.statement);
    this.setStatement(this.applicationCible.statement);
    this.showContent = true;
  }

  //get list application and list offer
  getApplications = function(){
    var json = JSON.stringify(
      {
        "auth": this.sharedService.getAutho()
      }
    );
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlAppliService,json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          var apps = JSON.parse(data.applications);
          for (var i=0; i<apps.length; i++){
            this.applicationList.push(new Appli(apps[i].id,apps[i].idOffer,apps[i].idStudent,apps[i].idPartner,apps[i].state))
          }
          console.log(this.applicationList);

          var offers = JSON.parse(data.offers);
          for (var i=0; i<offers.length; i++){
            this.appliedOfferList.push(new Offer(offers[i].ido,offers[i].enterprise,offers[i].dateCreation,offers[i].dateBeginning,offers[i].length,
              offers[i].activityField, offers[i].title, offers[i].areaCode,offers[i].location,offers[i].missionStatement,
              offers[i].pay,offers[i].details,offers[i].profile,offers[i].contactInformations));
          }
          console.log(this.appliedOfferList)
        },
        error => {
          console.log(error);
        }
      );
  }

  updateAppliCible(offerId:number){
    for(let appli of this.applicationList){
      if (appli.offerId == offerId){
        this.applicationCible = appli;
        break;
      }
    }
  }


  ngOnInit() {
    if (this.sharedService.getUser() != null)
      this.user = this.sharedService.getUser();
    else location.href = "http://"+this.sharedService.getAdr()+":4200/";
  }

}
