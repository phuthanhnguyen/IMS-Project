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
  URL:string = 'http://localhost:3000/uploadfile';
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

  ngOnInit() {
    if (this.sharedService.getUser() != null)
      this.user = this.sharedService.getUser();
    else location.href = "http://localhost:4200/";
  }

}
