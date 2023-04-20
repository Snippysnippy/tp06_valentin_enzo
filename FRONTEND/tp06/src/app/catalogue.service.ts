import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  apiUrl: string = environment.api;
  constructor(private http: HttpClient) { }

  getProduits(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl+"catalogue");
  }
  getProduitsWithFilter(filter: string): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl+"catalogue/filtre/"+filter);
  }

  getProduitById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+"catalogue/"+id);
  }
  
    
  //TP04 Modifications -> client.service
  // postClient(clientData: any) {
  //   return this.http.post('/api/clients', clientData);
  // }

  // getClient(clientId: any) {
  //   return this.http.get(`/api/clients/${clientId}`);
  // }

  // postLogin(loginData: any) {
  //   return this.http.post('/api/login', loginData);
  // }

  // TP03-1
  // getCatalogue() {
  //   return this.http.get('/api/catalogue');
  // }

  // TP03-2
  getCatalogue() {
    const catalogue = `[
      {
        "id": 1,
        "name": "Aiguillettes de poulet",
        "description": "Poulet français - 1kg",
        "price": 10
      },
      {
        "id": 2,
        "name": "Curry Madras",
        "description": "Marque métro - 480g",
        "price": 9
      },
      {
        "id": 3,
        "name": "Riz Palais des Thés",
        "description": "1kg",
        "price": 2
      },
      {
        "id": 4,
        "name": "Dragon Quest VIII",
        "description": "PS2- 2004",
        "price": 20000
      }
    ]`;

    return of(JSON.parse(catalogue));
  }
}