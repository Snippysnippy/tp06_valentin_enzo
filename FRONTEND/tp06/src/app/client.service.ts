import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientModule } from './client/client.module';

@Injectable({
  providedIn: 'root'
  // providedIn: ClientModule
})
export class ClientService {

  apiUrl: string = environment.api;

  constructor(private http: HttpClient) { }

  // getBouchon(): Observable<any> {
  //   return this.http.get(environment.catalogue);
  // }
    
  postClient(clientData: any) {
    return this.http.post(this.apiUrl + 'user', clientData);
  }

  getClient(clientId: any) {
    return this.http.get(this.apiUrl + `user`);
  }

  postLogin(login: string, password: string): Observable<any> {
    const formData = new FormData();
    //problème avec raw json
    formData.append('email', login);
    formData.append('password', password);
    return this.http.post<any>(this.apiUrl+"login", formData);
  }

  // private apiBaseUrl = 'https://example.com/api';

  // // Méthode pour récupérer tous les clients
  // getClients(): Observable<Client[]> {
  //   const url = `${this.apiBaseUrl}/clients`;
  //   return this.http.get<Client[]>(url);
  // }

  // // Méthode pour récupérer un client par son ID
  // getClient(id: number): Observable<Client> {
  //   const url = `${this.apiBaseUrl}/clients/${id}`;
  //   return this.http.get<Client>(url);
  // }

  // // Méthode pour ajouter un nouveau client
  // addClient(client: Client): Observable<Client> {
  //   const url = `${this.apiBaseUrl}/clients`;
  //   return this.http.post<Client>(url, client);
  // }

  // // Méthode pour mettre à jour un client existant
  // updateClient(client: Client): Observable<Client> {
  //   const url = `${this.apiBaseUrl}/clients/${client.id}`;
  //   return this.http.put<Client>(url, client);
  // }

  // // Méthode pour supprimer un client
  // deleteClient(id: number): Observable<any> {
  //   const url = `${this.apiBaseUrl}/clients/${id}`;
  //   return this.http.delete(url);
  // }
}