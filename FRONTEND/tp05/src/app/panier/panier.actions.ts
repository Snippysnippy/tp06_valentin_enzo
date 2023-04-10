import { Product } from "../models/product.model";
export class AjouterArticle {
  static readonly type = '[Panier] Ajouter un article';
  constructor(public produit: Product) {}
}

export class ViderPanier {
  static readonly type = '[Panier] Vider le panier';
}

export class RetirerArticle {
  static readonly type = '[Panier] Retirer un article';
  constructor(public produit: Product) {}
}
