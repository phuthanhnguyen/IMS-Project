export class User {
  id:number;
  lastName:string;
  firstName:string;
  type:string;
  username:string;
  password:string;

  protected constructor(id:number, lastName:string, firstName:string, type:string, username:string,password:string){
    this.id = id || -1;
    this.lastName = lastName;
    this.firstName = firstName;
    this.username = username;
    this.type = type;
    this.password = password || 'private';
  }
}

export class Student extends User{
  year:number; //BAC+1 to +5
  offerApplied: number[];
  constructor(id:number, lastName:string, firstName:string, type:string, username:string, password:string, year:number, offerApplied: number[]){
    super(id, lastName,firstName,type,username,password);
    this.year = year;
    this.offerApplied = offerApplied;
  }
}

export class Partner extends User{
  company:string;
  constructor(id:number, lastName:string, firstName:string, type:string, username:string, password:string, company:string){
    super(id, lastName,firstName,type,username,password);
    this.company = company;
  }
}

export class Insa extends User{
  constructor(id:number, lastName:string, firstName:string, type:string ,username:string, password:string){
    super(id, lastName,firstName,type,username,password);
  }
}

export class FSD extends User{
  constructor(id:number, lastName:string, firstName:string, type:string ,username:string, password:string){
    super(id, lastName,firstName,type,username,password);
  }
}

export class Admin extends User{
  constructor(id:number, type:string,username:string,password:string){
    super(id,null,null,type,username,password)
  }
}
