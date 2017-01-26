import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";
@Component({
  selector: 'app-conventions',
  templateUrl: './conventions.component.html',
  styleUrls: ['./conventions.component.css']
})
export class ConventionsComponent implements OnInit {
  conventionList: any[] = [];
  conventionUrl:string = 'http://localhost:3000/getconventions';
  urlAMSDecide:string = 'http://localhost:3000/setConventionsDecision';
  constructor(private http: Http, private sharedService: SharedService) {
    this.conventionUrl = 'http://'+this.sharedService.getAdr()+':3000/getconventions';
    this.urlAMSDecide = 'http://'+this.sharedService.getAdr()+':3000/setConventionsDecision';
    this.getConventions();
  }


  getConventions = function(){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');

    var json = JSON.stringify({
      'auth': this.sharedService.getAutho()
    });

    this.http.post(this.conventionUrl, json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=>{
          if (data != {}){
            console.log(data);
            this.conventionList = data;
          }
        },
        error=> console.log('error')
      );
  }

  downloadLink= function(index){
    return 'http://10.32.1.191:8080/IMS-war/resources/agreements/'+this.conventionList[index].id;
  }

  conventionResponse = function(decision,convention){
    //get application
    var conventionId = convention.id;
    console.log(conventionId);

    //change statement of application: send [studentId and offer Id]
    var requestContent = {
      'auth': this.sharedService.getAutho(),
      'conventionId': conventionId,
      'decision': decision
    }

    var json = JSON.stringify(requestContent);
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post(this.urlAMSDecide, json, {headers: headers})
      .map(res=>res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.getConventions();
        },
        error=>console.log(error)
      )
  }

  ngOnInit() {
    if (this.sharedService.getUser() == null)
      location.href = "http://"+this.sharedService.getAdr()+":4200/";
  }

}
