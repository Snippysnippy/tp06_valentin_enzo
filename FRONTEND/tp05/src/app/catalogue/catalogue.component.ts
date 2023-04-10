import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AjouterArticle } from '../panier/panier.actions';
import { Store } from '@ngxs/store';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html'
})
export class CatalogueComponent implements OnInit {
  searchTerm = '';
  products: Product[] = [];
  filteredProducts$!: Observable<Product[]>;
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
      this.filteredProducts$ = data;

      console.log(this.products);
      console.log(this.filteredProducts$);
    });
  }

  private filterProducts(searchTerm: string): Product[] {
    if (!searchTerm) {
      return this.products;
    }
    return this.products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
