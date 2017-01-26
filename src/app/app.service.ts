import { Component, Injectable,Input,Output,EventEmitter } from '@angular/core';
import {User} from './model/user';
import {Offer} from './model/offer';

@Injectable()
export class SharedService {
  private user: User = null;
  private autho: string = null;
  private offerCible: Offer =null;
  //private adr:string='10.32.3.71';
  private adr:string='10.32.1.165';
  constructor() {}

  setUser(user: User){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  setAutho(autho: string){
    this.autho = autho;
  }

  getAutho(){
    return this.autho;
  }

  setOfferCible(offer: Offer){
    this.offerCible = offer;
  }

  getOfferCible(){
    return this.offerCible;
  }

  getAdr(){
    return this.adr;
  }
}
