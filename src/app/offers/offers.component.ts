import { Component, OnInit } from '@angular/core';
import {Offer} from '../model/offer'
import {Http, Headers} from '@angular/http';
import {SharedService} from "../app.service";
import { FileUploader } from '../../../node_modules/ng2-file-upload';
import {Student} from "../model/user";

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.component.html',
  styleUrls: ['offers.component.css']
})

export class OffersComponent implements OnInit {
  user:Student;
  //define binding input for filter
  date:string = null;
  companyName: string = null;
  internshipLength: number = null;
  activityField: string = null;
  areaCode:string = null;
  pay: string = null;
  keywords: string = null;
  order:string = null;
  cvs:any[] = [];

  choosedCV:string = null;
  ifStudent:number=0;

  //apply form
  message:string=null;

  //define model of template
  offers: Offer[] = [];

  //for the display purpose
  offerItem:Offer;
  offerCible: Offer = null;
  showDetails = false;
  indexSelected:number;

  //define urls to make http requests
  urlFilterdOffers:string = 'http://'+this.sharedService.getAdr()+':3000/filter';
  urlCreateAppli: string = 'http://'+this.sharedService.getAdr()+':3000/apply';
  urlGetOffers: string = 'http://'+this.sharedService.getAdr()+':3000/getoffers';
  cvUrl:string = 'http://'+this.sharedService.getAdr()+':3000/getCvs';

  constructor(private http: Http, private sharedService: SharedService) {
    this.getAllOffers(this.urlGetOffers);
    this.user = this.sharedService.getUser();
    console.log(this.user.type)
    if (this.user.type == 'STUDENT'){
      this.ifStudent = 1;
      this.getCvList();
    }

  }

  filter(){
    console.log(this.order);
    var json = JSON.stringify({"auth": this.sharedService.getAutho(),
      "filterContent": "{\"date\": \""+this.date+"\", " +
      "\"companyName\": \""+this.companyName+"\", " +
      "\"internshipLength\": \""+this.internshipLength+"\", " +
      "\"activityField\": \""+this.activityField+"\", " +
      "\"areaCode\": \""+this.areaCode+"\", " +
      "\"pay\": \""+this.pay+"\", " +
      "\"keywords\": \""+this.keywords+"\", " +
      "\"order\": \""+this.order+
      "\"}"});

    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlFilterdOffers,json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=>{
          var jsonVide = {};
          if (data != jsonVide){
            console.log(data);
            this.offers = [];
            for (var offer of data){
              this.offerItem = new Offer(offer.ido,offer.enterprise,offer.dateCreation,offer.dateBeginning,offer.length,
                offer.activityField, offer.title, offer.areaCode,offer.location,offer.missionStatement,
                offer.pay,offer.details,offer.profile,offer.contactInformations);
              this.offers.push(this.offerItem);
            }
          }
        },
        error=> console.log('error')
      );
  }

  getAllOffers(url:string){
    //todo: remove applied offer of this list
    var headers = new Headers();
    headers.append('Content-type','application/json');
    var json = JSON.stringify({"auth": this.sharedService.getAutho()});
    this.http.post(url,json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=>{
          var offersList = (data);
          this.offers = [];
          for (var offer of offersList){
            this.offerItem = new Offer(offer.ido,offer.enterprise,offer.dateCreation,offer.dateBeginning,offer.length,
              offer.activityField, offer.title, offer.areaCode,offer.location,offer.missionStatement,
              offer.pay,offer.details,offer.profile,offer.contactInformations);
            this.offers.push(this.offerItem);
          }
        },
        error=> console.log('error')
      );
  }

  updateOfferCible = function(offer: Offer){
    this.offerCible = offer;
    this.showDetails = true;
  }

  selectItem = function(index:number){
    this.indexSelected = index;
  }

  isSelected = function(index:number){
    if (this.indexSelected == index){
      return "active";
    } else return "";
  }

  //apply to an offer
  apply = function(offer: Offer){
    //create a application object
    console.log(this.choosedCV);
    if (this.choosedCV != null) {
      var info = {
        'offerId': this.offerCible.id,
        'auth': this.sharedService.getAutho(),
        'company': this.offerCible.enterprise,
        'message': this.message,
        'cvId': this.choosedCV
      };
      var json = JSON.stringify(info);

      //upload it to DB
      this.insertAppliToDb(this.urlCreateAppli, json);

      //todo: try to make a dialog to confirm an application

      //test
      console.log('applied to offer number ' + this.offerCible.id);
      alert("The candidate is sent to the partner!!!");
      this.getAllOffers(this.urlGetOffers);
    } else alert("Choose a CV when applying to an offer!");
  }

  //create appli on DB
  insertAppliToDb = function(url:string, json:string){
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(url,json,{headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=>{
          console.log(data);
        },
        error=>console.log(error)
      )
  }

  //todo: for insa, insert a button of masking offer that do hidding offer action

  getCvList = function(){
    //change statement of application: send [studentId and offer Id]
    var requestContent = {
      'auth': this.sharedService.getAutho()
    }

    var json = JSON.stringify(requestContent);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.cvUrl, json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.cvs = data;
        },
        error=>console.log(error)
      )
  };
  ngOnInit() {
    if (this.sharedService.getUser() == null)
      location.href = 'http://'+this.sharedService.getAdr()+':4200/';
  }

}
