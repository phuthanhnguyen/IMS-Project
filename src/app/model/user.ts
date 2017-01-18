export class User {
  id:number;
  name:string;
  type:string;
  username:string;
  password:string;
  email:string;
  pathway:string;

  protected constructor(id:number, name:string, type:string, username:string,password:string, email:string){
    this.id = id || -1;
    this.name = name;
    this.username = username;
    this.type = type;
    this.password = password || 'private';
    this.email = email;
  }
}

export class Student extends User{
  year:number; //BAC+1 to +5
  cvs: any[];
  pathway:string;
  constructor(id:number, name:string, type:string, username:string, password:string, year:number, cvs: any[], email:string, pathway:string){
    super(id, name,type,username,password,email);
    this.year = year;
    this.cvs = cvs;
    this.pathway = pathway;
  }
}

export class Partner extends User{
  company:string;
  adresse:string;
  telephone:string;

  constructor(id:number, name:string, type:string, username:string, password:string, company:string, email:string){
    super(id, name,type,username,password,email);
    this.company = company;
  }
}

export class Insa extends User{
  year:number;
  pathway:string;

  constructor(id:number, name:string, type:string ,username:string, password:string, email:string){
    super(id, name,type,username,password,email);
  }
}

export class FSD extends User{
  constructor(id:number, name:string, type:string ,username:string, password:string, email:string){
    super(id,name,type,username,password,email);
  }
}

export class Admin extends User{
  constructor(id:number, type:string,username:string){
    super(id,null,type,username,null,null)
  }
}
