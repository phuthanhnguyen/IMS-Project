export class Appli{
  id:number;
  offerId:number;
  studentId:number;
  partnerId:number;
  statement:string;
  /*0:student sent the request to offer
  1:partner accept candidate
  2:insa accept the candidate
  3:sdf accept the candidate
  -1:partner refuse candidate
  -2:insa refuse candidate
  -3:sdf refuse the candidate */

  constructor(id:number,offerId:number,studentId:number,partnerId:number,statement:string){
    this.id = id;
    this.offerId = offerId;
    this.studentId = studentId;
    this.partnerId = partnerId;
    this.statement = statement;
  }
}
