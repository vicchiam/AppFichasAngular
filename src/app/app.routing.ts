import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { ListUsersComponent } from './components/listUsers.component';
import { EditUserComponent } from './components/editUser.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'users', component: ListUsersComponent},
	{path: 'user/:id', component: EditUserComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
