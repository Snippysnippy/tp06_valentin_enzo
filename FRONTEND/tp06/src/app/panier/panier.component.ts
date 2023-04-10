import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Product } from '../models/product.model';
import { PanierState } from './panier.state';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
  
})
export class PanierComponent implements OnInit {
  @Select(PanierState.produitsPanier) produitsPanier$!: Observable<Product[]>;

  constructor() {}

  ngOnInit(): void {}
}