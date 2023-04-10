import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AjouterArticle } from '../panier/panier.actions';
import { Store } from '@ngxs/store';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html'
})
export class CatalogueComponent implements OnInit {
  searchTerm = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchControl = new FormControl('');

  constructor(private service: CatalogueService, private store: Store) { }

  public ajouterArticle(article: any) {
    this.store.dispatch(new AjouterArticle(article));
  }

  ngOnInit() {
    //TP3-02
    // this.service.getCatalogue().subscribe(data => {
    //   this.products = data;
    //   this.filteredProducts = this.products;
    // });

    //TP3-03
    this.service.getProduits().subscribe(data => {
      this.products = data;
      this.filteredProducts = this.products;
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if(value) {
          this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
          );
        }
      });
  }
}