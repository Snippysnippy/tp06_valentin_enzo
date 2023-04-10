import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormulaireSaisieClientComponent } from './formulaire-saisie-client/formulaire-saisie-client.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'client/login', component: LoginComponent },
  { path: 'client/compte', component: FormulaireSaisieClientComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
