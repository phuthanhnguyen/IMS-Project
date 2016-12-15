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
  appliedOffersId:number[];
  offerCible: Offer = null;
  applicationCible: Appli = null;
  //display purpose
  appliStatement:number=null;
  showContent: boolean = false;
  //model list to show on template
  appliedOfferList: Offer[] = [];
  applicationList: Appli[] = []
  //define the url of the service
  urlOfferService:string=null;
  urlAppliService:string =null;
  constructor(private http: Http, private sharedService: SharedService) {
    //get user
    //this.user =  this.sharedService.getUser();
    console.log(this.user);
    //get id of applied offer
    //this.appliedOffersId = this.user.offerApplied;
    //console.log(this.appliedOffersId);
    //get list applied offer from server
    //this.getListOffer(this.appliedOffersId);
    //get application list
    //test with a local appli list
    this.applicationList.push(new Appli(2,8,1,4,"WAITING_CLASS_COORDINATOR"));
    this.applicationList.push(new Appli(2,4,1,4,"WAITING_PARTNER"));
    this.applicationList.push(new Appli(2,1,1,4,"WAITING_SFO"));
    //test with a created list applied offer
    this.appliedOfferList.push(new Offer(1,"Cap Gemini", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.appliedOfferList.push(new Offer(4,"Linagora", "12/3/2016", "1/2/2017", 6, "Computer Science", "Java development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.appliedOfferList.push(new Offer(8,"Microsoft", "12/3/2016", "1/2/2017", 6, "Computer Science", "C++ development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
  }

  setStatement(statement:string){
    if (statement=="WAITING_CLASS_COORDINATOR")
        this.appliStatement=1;
    if (statement=="WAITING_PARTNER")
        this.appliStatement=0;
    if (statement=="WAITING_SFO")
        this.appliStatement=2;
    console.log(this.appliStatement);
  }
  setOfferCible(index){
    this.offerCible = this.appliedOfferList[index];
    this.updateAppliCible(this.offerCible.id);
    console.log(this.applicationCible.statement);
    this.setStatement(this.applicationCible.statement);
    this.showContent = true;
  }

  //get list applied offer from server
  getListOffer = function(appliedOffersId: Offer[]){
    var json = JSON.stringify(appliedOffersId);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlOfferService,json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this.appliedOfferList = JSON.parse(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  //get list application
  getApplications = function(){
    var json = JSON.stringify(this.user.id);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlAppliService,json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this.applicationList = JSON.parse(data);
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
  }

}
