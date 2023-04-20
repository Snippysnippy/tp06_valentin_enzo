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
          this.service.getProduitsWithFilter(value).subscribe(data => {
            this.filteredProducts = data;
          });
        } else {
          this.filteredProducts = this.products;
        }
      });
  }
}
