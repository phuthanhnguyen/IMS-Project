export class Appli{
  id:number;
  offerId:number;
  studentId:number;
  partnerId:number;
  statement:string;

  constructor(id:number,offerId:number,studentId:number,partnerId:number,statement:string){
    this.id = id;
    this.offerId = offerId;
    this.studentId = studentId;
    this.partnerId = partnerId;
    this.statement = statement;
  }
}
