import { Component, OnInit } from '@angular/core';
import {Offer} from "../model/offer";
import {Appli} from "../model/appli";
import {User, Partner, Student} from "../model/user";
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-partneroffers',
  templateUrl: './partneroffers.component.html',
  styleUrls: ['./partneroffers.component.css']
})
export class PartneroffersComponent implements OnInit {
  partner: Partner;

  //models
  myoffers: Offer[] = [];

  //variable for display things
  indexOfferCible:number = null;

  //for http request
  urlOMS: string = 'http://localhost:3000/partneroffers';

  offerTest:Offer;
  constructor(private http: Http, private sharedService: SharedService, private router: Router) {
    this.partner = this.sharedService.getUser();
    this.getMyOffers();
  }

  //get my offer: partner object -> company name -> offers list
  getMyOffers = function(){
    var company = this.partner.company;
    var json = JSON.stringify({
      'company': company,
      'auth': this.sharedService.getAutho()
    });
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlOMS, json, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          var offers = data;
          for (var i=0; i<offers.length; i++){
            this.myoffers.push(new Offer(offers[i].ido,offers[i].enterprise,offers[i].dateCreation,offers[i].dateBeginning,offers[i].length,
              offers[i].activityField, offers[i].title, offers[i].areaCode,offers[i].location,offers[i].missionStatement,
              offers[i].pay,offers[i].details,offers[i].profile,offers[i].contactInformations));
          }
          console.log(this.myoffers);
        },
        error => console.log(error)
      );
  }

  //for the display purpose
  setOfferCible(offer:Offer, index:number){
    this.sharedService.setOfferCible(offer);
    this.indexOfferCible = index;
    this.router.navigate(['/partner/myoffers', offer.activityField.replace(" ","-")]);
  }

  isSelectedOffer = function(index:number){
    if (this.indexOfferCible == index){
      return "active";
    } else return "";
  }

  ngOnInit() {
    //if (this.sharedService.getUser() != null)
      this.partner = this.sharedService.getUser();
    //else location.href = "http://localhost:4200/";
  }

}
