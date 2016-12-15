import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { StudentinterfaceComponent } from './studentinterface/studentinterface.component';
import { OffersComponent } from './offers/offers.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import {NewaccountComponent} from "./newaccount/newaccount.component";
import {PartnerComponent} from "./partner/partner.component";
import {AppliedoffersComponent} from "./appliedoffers/appliedoffers.component";
import {PartneroffersComponent} from "./partneroffers/partneroffers.component";
import {AcceptedcandidatesComponent} from "./acceptedcandidates/acceptedcandidates.component";
import {InsaComponent} from "./insa/insa.component";
import {WaitingofferComponent} from "./waitingoffer/waitingoffer.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'student', component: StudentinterfaceComponent,
    children: [
      { path: '', component: ProfileComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'offers', component: OffersComponent},
      { path: 'appliedoffers', component: AppliedoffersComponent},
    ]
  },
  { path: 'partner', component: PartnerComponent,
    children: [
      { path: '', component: PartneroffersComponent},
      { path: 'myoffers', component: PartneroffersComponent},
      { path: 'acceptedcandidates', component: AcceptedcandidatesComponent},
    ]
  },
  { path: 'insa', component: InsaComponent,
    children: [
      { path: '', component: OffersComponent},
      { path: 'alloffers', component: OffersComponent},
      { path: 'waitingoffers', component: WaitingofferComponent},
      /*{ path: 'maskedoffers', component: MaskedoffersComponent},*/
      { path: 'decidedcandidates', component: AcceptedcandidatesComponent},
    ]
  },
  /*{ path: 'SFO', component: SFOComponent,
    children: [
      { path: '', component: OffersComponent},
      { path: 'waitingoffers', component: WaitingofferComponent},
      { path: 'acceptedcandidates', component: AcceptedcandidatesComponent},
    ]
  },*/
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: AdminComponent},
      { path: 'newaccount', component: NewaccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
