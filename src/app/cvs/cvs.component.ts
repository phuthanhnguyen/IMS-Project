import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.service";

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CvsComponent implements OnInit {
  cvList : any[] = [];
  cvUrl:string = 'http://'+this.sharedService.getAdr()+':3000/getCvs';
  cvName:string[] = [];
  downloadLink:string[] = [];

  constructor(private http: Http, private sharedService: SharedService) {
    this.getCvList();
  }

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
          this.cvList = [];
          for (var i=0;i<data.length;i++){
            this.cvList.push(data[i]);
            this.cvName.push("");
            this.downloadLink.push("http://10.32.1.191:8080/IMS-war/resources/cvs/"+data[i].id);
          }
        },
        error=>console.log(error)
      )
  };

  delete = function(index){
    console.log("delete "+index);
    var cvId = this.cvList[index].id;

    var json = JSON.stringify({
      "auth": this.sharedService.getAutho(),
      "cvId": cvId
    });
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post('http://'+this.sharedService.getAdr()+':3000/deletecv',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.getCvList();
        },
        error=> console.log(error)
      )
  };

  rename = function(index){
    console.log("rename "+index);
    var cvId = this.cvList[index].id;

    var json = JSON.stringify({
      "auth": this.sharedService.getAutho(),
      "cvId": cvId,
      "cvName": this.cvName[index]
    });
    console.log(json);
    if (this.cvName != null) {
      var headers = new Headers();
      headers.append('Content-type', 'application/json');
      this.http.post('http://'+this.sharedService.getAdr()+':3000/renamecv', json, {headers: headers})
        .map(res => res.json())
        .subscribe(
          data=> {
            console.log(data);
            this.cvName[index] = null;
            this.getCvList();
          },
          error=> console.log(error)
        )
    } else alert("Insert a name...");
  };

  ngOnInit() {
    if (this.sharedService.getUser() == null)
      location.href = "http://"+this.sharedService.getAdr()+":4200/";
  }

}
