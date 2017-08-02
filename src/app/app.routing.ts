import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { UsersComponent } from './components/users.component';
import { TrademarkComponent } from './components/trademark.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'users', component: UsersComponent},
	{path: 'trademarks', component: TrademarkComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
