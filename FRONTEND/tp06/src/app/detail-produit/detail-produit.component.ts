import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AjouterArticle } from '../panier/panier.actions';
import { Product } from '../models/product.model';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.scss']
})
export class DetailProduitComponent implements OnInit {
  produit!: Product;

  constructor(private route: ActivatedRoute, private store: Store,private service: CatalogueService) { }

  ngOnInit(): void {
    const id = + (this.route.snapshot.paramMap.get('id') || 1);
    // Ici, on récupère le produit correspondant à l'id en utilisant par exemple un service
    this.service.getProduitById(id).subscribe(data => {
      this.produit = data[0];
    });
  }

  ajouterAuPanier() {
    this.store.dispatch(new AjouterArticle(this.produit));
  }
}
