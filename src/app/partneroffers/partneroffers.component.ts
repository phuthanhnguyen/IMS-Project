import { Component, OnInit } from '@angular/core';
import {Offer} from "../model/offer";
import {Appli} from "../model/appli";
import {User, Partner, Student} from "../model/user";
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";

@Component({
  selector: 'app-partneroffers',
  templateUrl: './partneroffers.component.html',
  styleUrls: ['./partneroffers.component.css']
})
export class PartneroffersComponent implements OnInit {
  //models
  myoffers: Offer[] = [];
  candidates: Appli[] = [];
  studentList: Student[] = [];

  //chosen object
  offerCible: Offer = null;
  studentCible: Student = null;

  candidateProfile: User = null;
  partner: Partner;

  //variable for display things
  showDetails:boolean = false;
  indexOfferCible:number = null;
  indexStudentCible:number = null;
  showProfile:boolean = false;

  //for http request
  urlOMS: string;
  urlAMS: string;

  offerTest:Offer;
  constructor(private http: Http, private sharedService: SharedService) {
    this.partner = this.sharedService.getUser();
    //test local
    this.offerTest = (new Offer(10,"Samsung", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.myoffers.push(this.offerTest);
    this.offerTest = (new Offer(11,"Dell", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.myoffers.push(this.offerTest);
    this.offerTest = (new Offer(12,"HP", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.myoffers.push(this.offerTest);
    this.offerTest = (new Offer(13,"Htc", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.myoffers.push(this.offerTest);
    this.offerTest = (new Offer(14,"Sony", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.myoffers.push(this.offerTest);
    this.offerTest = (new Offer(15,"LOL", "12/3/2016", "1/2/2017", 6, "Computer Science", "Web development", 31400, "Toulouse - France", "Do something interesting", 1000, "Some details", "Javascript,html,css,PHP", "tests@test.com"));
    this.myoffers.push(this.offerTest);
    this.studentList.push(new Student(1,"NGUYEN","Phu Thanh","Student","ptnguyen",null,5,[]));
    this.studentList.push(new Student(2,"fdfdsf","Phu Thanh","Student","ptnguyen",null,5,[]));
    this.studentList.push(new Student(3,"fdfsd","Phu Thanh","Student","ptnguyen",null,5,[]));
    //this.getMyOffers();
  }

  //get my offer: partner object -> company name -> offers list
  getMyOffers = function(){
    var company = this.partner.company;
    var json = JSON.stringify(company);
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post(this.urlOMS, json, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.myoffers = JSON.parse(data);
          console.log(this.myoffers);
        },
        error => console.log(error)
      );
  }

  //get candidate: offer object -> offer ID -> application list
  getCandidates = function() {
    /*var offerID = this.offerCible.id;
    //sent offerID to AMS to get application list
    var json = JSON.stringify({'offerID': offerID});
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlAMS, json, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.candidates = JSON.parse(data);
          this.getStudentList();
          console.log(this.candidates);
        },
        error => console.log(error)
      )*/
  }
  //get student list: application list -> list student
  getStudentList = function() {
    //application list -> list student
    var json = JSON.stringify(this.candidates);
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlAMS, json, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.studentList = JSON.parse(data);
          console.log(this.studentList);
        },
        error => console.log(error)
      )
  }

  //for the display purpose
  setOfferCible(offer:Offer, index:number){
    this.offerCible = offer;
    this.indexOfferCible = index;
  }

  setCandidateCible(student: Student, index:number) {
    this.studentCible = student;
    this.indexStudentCible = index;
    this.showProfile = true;
    console.log(this.indexStudentCible);
  }

  isSelectedOffer = function(index:number){
    if (this.indexOfferCible == index){
      return "active";
    } else return "";
  }

  isSelectedStudent = function(index:number){
    if (this.indexStudentCible == index){
      console.log(this.indexStudentCible);
      return "active";
    } else return "";
  }

  //decide a response to candidate
  candidateResponse(decison:string) {
    //change statement of application: send [studentId and offer Id]
    var requestContent = {
      'studentId': this.studentCible,
      'offerId': this.offerCible,
      'decision': decison,
      'partnerId': this.sharedService.getUser().id
    }
    var json = JSON.stringify(requestContent);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlAMS, json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
        },
        error=>console.log(error)
      )
  }

  ngOnInit() {
  }

}
