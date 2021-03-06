import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './app.router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentinterfaceComponent } from './studentinterface/studentinterface.component';
import { OffersComponent } from './offers/offers.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { PartnerComponent } from './partner/partner.component';
import { AppliedoffersComponent } from './appliedoffers/appliedoffers.component';
import { PartneroffersComponent } from './partneroffers/partneroffers.component';
import { InsaComponent } from './insa/insa.component';
import { WaitingofferComponent } from './waitingoffer/waitingoffer.component';
import { AcceptedcandidatesComponent } from './acceptedcandidates/acceptedcandidates.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentinterfaceComponent,
    OffersComponent,
    ProfileComponent,
    AdminComponent,
    NewaccountComponent,
    PartnerComponent,
    AppliedoffersComponent,
    PartneroffersComponent,
    InsaComponent,
    WaitingofferComponent,
    AcceptedcandidatesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RoutingModule,
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
