import { Component, OnInit } from '@angular/core';
import {SharedService} from "../app.service";
import {User, Student} from "../model/user";
import {Http, Headers} from "@angular/http";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Student;
  cvs: any[]=[];
  dlLinkCV : any[] = [];

  //for file upload
  URL:string = 'http://'+this.sharedService.getAdr()+':3000/uploadfile';
  public uploader:FileUploader = new FileUploader({url: this.URL});

  constructor(private  sharedService: SharedService, private http:Http) {
    this.user = this.sharedService.getUser();
    this.cvs = (this.sharedService.getUser()).cvs;
  }

  download = function(index){
    var url = "http://10.32.3.15:8080/IMS-war/resources/cvs/"+this.cvs[index].id;
    return url;
  }

  //upload a file
  uploadFile = function(){
    console.log(this.uploader.queue);
    var item = this.uploader.queue[0];
    console.log(item);
    item.upload();
  }

  delete = function(index){
    console.log("delete "+index);
    var cvId = this.cvs[index].id;

    var autho = btoa(this.username+':'+this.password);
    this.sharedService.setAutho(autho);
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
        },
        error=> console.log(error)
      )

  }

  ngOnInit() {
    if (this.sharedService.getUser() != null)
      this.user = this.sharedService.getUser();
    else location.href = 'http://'+this.sharedService.getAdr()+':4200/';
  }

}
