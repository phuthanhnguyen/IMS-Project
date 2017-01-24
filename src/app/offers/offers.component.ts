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
  urlFilterdOffers:string = "http://localhost:3000/filter";
  urlCreateAppli: string = "http://localhost:3000/apply";
  urlGetOffers: string = "http://localhost:3000/getoffers";

  offerTest:Offer;

  constructor(private http: Http, private sharedService: SharedService) {
    this.getAllOffers(this.urlGetOffers);
    this.user = this.sharedService.getUser();
    this.cvs = this.user.cvs;
    // for the test
    /*this.offerTest = new Offer(1,"Cap Gemini", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France",
      "<p>Dans ce cadre, vous êtes en charge :</p> <p> -   De l’analyse, l’étude, la réalisation des JCL <p>- Du maintien en condition opérationnelle des applications</p> <p>- De l’application des actions de gestion de changement pour la production</p> <p>- De la rédaction des procédures d’exploitation des applications</p> <p>- Du reporting et du planning des mises en production</p> <p>- Du support technique</p>", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com");
    this.offers.push(this.offerTest);
    this.offerTest = new Offer(2,"CGI", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com");
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(3,"Sopra", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);*/
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
            this.offers = data;
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
    var info = {
      'offerId': this.offerCible.id,
      'auth':this.sharedService.getAutho(),
      'company': this.offerCible.enterprise,
      'message': this.message
    };
    var json = JSON.stringify(info);

    //upload it to DB
    this.insertAppliToDb(this.urlCreateAppli, json);

    //todo: try to make a dialog to confirm an application

    //test
    console.log('applied to offer number '+this.offerCible.id);
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


  ngOnInit() {
    if (this.sharedService.getUser() == null)
      location.href = "http://localhost:4200/";
  }

}
