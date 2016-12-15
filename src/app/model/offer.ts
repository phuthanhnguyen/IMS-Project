export class Offer{
  id:number;
  enterprise:string;
  dateCreation:string; //forme: dd-mm-yy
  dateBeginning:string;
  length:number;
  activityField:string;
  title:string;
  areaCode:number;
  location:string;
  missionStatement:string;
  pay:number;
  details:string;
  profile:string;
  contactInformations:string;

  constructor(id:number,enterprise:string, dateCreation:string, dateBeginning:string,length:number,activityField:string,
              title:string,areaCode:number,location:string,missionStatement:string,pay:number,details:string,
              profile:string,contactInformations:string){
    this.id = id;
    this.enterprise = enterprise;
    this.dateCreation = dateCreation;
    this.dateBeginning = dateBeginning;
    this.length = length;
    this.activityField = activityField;
    this.title = title;
    this.areaCode = areaCode;
    this.location = location;
    this.missionStatement = missionStatement;
    this.pay = pay;
    this.details = details;
    this.profile = profile;
    this.contactInformations = contactInformations;
  }
}
