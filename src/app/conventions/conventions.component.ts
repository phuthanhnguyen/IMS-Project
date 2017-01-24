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

  constructor(private http: Http, private serviceShared: SharedService) {
    this.getConventions();
  }


  getConventions = function(){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');

    var json = JSON.stringify({
      'auth': this.serviceShared.getAutho()
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

  ngOnInit() {
    if (this.sharedService.getUser() == null)
      location.href = "http://localhost:4200/";
  }

}
