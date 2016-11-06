import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const router: Routes = [
	{path: '', component: AppComponent},
	{path: 'login', component: LoginComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);