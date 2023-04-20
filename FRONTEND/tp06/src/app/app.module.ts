import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { FilterPipe } from './filter.pipe';
import { TotemComponent } from './totem/totem.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ClientModule } from './client/client.module';
import { NgxsModule } from '@ngxs/store';
import { PanierModule } from './panier/panier.module';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { ApiHttpInterceptor } from './api-http-interceptor';

const routes: Routes = [
  { path: '', loadChildren: () => import('./app-routing.module').then(m => m.AppRoutingModule) },
  { path: 'client', loadChildren: () => import('./client-routing.module').then(m => m.ClientRoutingModule) },
];

@NgModule({
  declarations: [
    AppComponent,
    TetiereComponent,
    FooterComponent,
    CatalogueComponent,
    FilterPipe,
    TotemComponent,
    AccueilComponent,
    DetailProduitComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ClientModule,
    NgxsModule.forRoot(),
    PanierModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
