import { Component, Injectable,Input,Output,EventEmitter } from '@angular/core';
import {User} from './model/user';
import {Offer} from './model/offer';

@Injectable()
export class SharedService {
  private offers: Offer[] = [];
  private user: User = null;

  constructor() {}

  setUser(user: User){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  setOffers(offers: Offer[]){
    this.offers = offers;
  }

  getOffers(){
    return this.offers;
  }
}
