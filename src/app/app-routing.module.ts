import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { AccountListComponent } from './account-list/account-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainmenuComponent
  },
  {
    path: 'client-list',
    component: ClientListComponent
  },
  {
    path: 'client-list/form/:id',
    component: ClientFormComponent
  },
  {
    path: 'client-list/form',
    component: ClientFormComponent
  },
  {
    path: 'account/:id',
    component: AccountListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
