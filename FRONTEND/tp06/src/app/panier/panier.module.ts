import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from './panier.state';


@NgModule({
  declarations: [PanierComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([PanierState])
  ],
  exports: [PanierComponent]
})
export class PanierModule { }
