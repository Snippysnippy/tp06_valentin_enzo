import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { PanierState } from '../panier/panier.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.scss']
})
export class TotemComponent {
  @Select(PanierState.nombreArticles) nombreArticles$!: Observable<number>;
}
