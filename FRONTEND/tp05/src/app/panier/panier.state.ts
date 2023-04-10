import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Product } from '../models/product.model';
import { AjouterArticle } from './panier.actions';

export interface PanierStateModel {
  articles: Product[];
}

@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    articles: []
  }
})
@Injectable()
export class PanierState {

  @Selector()
  static nombreArticles(state: PanierStateModel): number {
    return state.articles.length;
  }

  @Selector()
  static produitsPanier(state: PanierStateModel) {
    return state.articles;
  }

  @Action(AjouterArticle)
  ajouterArticle(ctx: StateContext<PanierStateModel>, action: AjouterArticle) {
    const state = ctx.getState();
    ctx.patchState({
      articles: [...state.articles, action.produit]
    });
  }

}
