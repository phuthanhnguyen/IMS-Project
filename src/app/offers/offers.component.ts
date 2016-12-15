import { Component, OnInit } from '@angular/core';
import {Offer} from '../model/offer'
import {Http, Headers} from '@angular/http';
import {SharedService} from "../app.service";
import {Student, User} from "../model/user";

@Component({
  selector: 'app-offers',
  templateUrl: 'offers.component.html',
  styleUrls: ['offers.component.css']
})
export class OffersComponent implements OnInit {
  //define binding input
  date:string = null;
  companyName: string = null;
  internshipLength: number = null;

  //define model of template
  offers: Offer[] = [];

  //for the display purpose
  offerItem:Offer;
  offerCible: Offer = null;
  showDetails = false;
  indexSelected:number;

  //define urls to make http requests
  urlFilterdOffers:string ;
  urlGetUser: string;
  urlCreateAppli: string;
  urlUpdateUser: string;
  urlGetOffers: string = "http://10.32.1.67:8080/IMS-war/resources/hello/offers";
  //for test purpose
  offerTest: Offer;

  constructor(private http: Http, private sharedService: SharedService) {
    //this.getAllOffers(this.urlGetOffers);
    // for the test
    this.offerTest = new Offer(1,"Cap Gemini", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France",
      "<p>Dans ce cadre, vous êtes en charge :</p> <p> -   De l’analyse, l’étude, la réalisation des JCL <p>- Du maintien en condition opérationnelle des applications</p> <p>- De l’application des actions de gestion de changement pour la production</p> <p>- De la rédaction des procédures d’exploitation des applications</p> <p>- Du reporting et du planning des mises en production</p> <p>- Du support technique</p>", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com");
    this.offers.push(this.offerTest);
    this.offerTest = new Offer(2,"CGI", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com");
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(3,"Sopra", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(4,"Linagora", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(5,"BlueMail", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(6,"IRIT", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(7,"LAAS", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(8,"Microsoft", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(9,"Apple", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(10,"Samsung", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(11,"Dell", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(12,"HP", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(13,"Htc", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(14,"Sony", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
    this.offerTest = (new Offer(15,"LOL", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.offers.push(this.offerTest);
  }

  filter(url:string){
    var json = JSON.stringify({"date": this.date, "companyName": this.companyName, "internshipLength": this.internshipLength});
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlFilterdOffers,json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=>{
          var offersList = JSON.parse(data);
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

  getAllOffers(url:string){
    //todo: remove applied offer of this list
    console.log("get offers");
    var headers = new Headers();
    this.http.get(url,{headers: headers})
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
    //add offer id to the applied offer list
    this.sharedService.getUser().offerApplied.push(offer.id);
    console.log(this.sharedService.getUser().offerApplied);

    //create a application object
    var appli = {
      'offerId': this.offerCible,
      'studentId': this.sharedService.getUser().id,
      'partnerId': this.offerCible.partnerId,
      'statement': 0
    };
    var json = JSON.stringify(appli);

    //upload it to DB
    this.insertAppliToDb(this.urlCreateAppli, json);

    //update user in DB
    this.updateUserDB(this.urlUpdateUser,this.sharedService.getUser());

    //request user object from DB to refresh informations
    this.refreshUser(this.urlGetUser);

    //todo: try to make a dialog to confirm an application

    //test
    console.log('applied to offer number '+offer.id);
  }

  //update an user in DB
  updateUserDB = function(url:string, user: User){
    //update user in DB
    var json = JSON.stringify(user);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.get(url,json,{headers:headers})
      .map(res=>res.json())
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
  }

  //request user object from DB to refresh informations
  refreshUser = function(url:string){
    var json = JSON.stringify({"username": this.sharedService.getUser().username, "password": this.sharedService.getUser().password});
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(url,json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=>{
          this.sharedService.setUser(new Student(data.id,data.lastName,data.firstName,data.type,data.username,null,data.year,data.offerApplied))
        },
        error=>console.log(error)
      );
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
  }

}
