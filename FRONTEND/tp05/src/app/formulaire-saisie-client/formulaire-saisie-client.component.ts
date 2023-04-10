import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-formulaire-saisie-client',
  templateUrl: './formulaire-saisie-client.component.html',
  styleUrls: ['./formulaire-saisie-client.component.scss']
})
export class FormulaireSaisieClientComponent implements OnInit {
  constructor(private service: ClientService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  civilite : string = "";
  nom : string = "";
  prenom : string = "";
  adresse : string = "";
  cp : string = "";
  ville : string = "";
  pays : string = "";
  tel : string = "";
  email : string = "";
  login : string = "";
  password : string = "";

  recap = false

  getValidationCivilite () : boolean {
    return (/^[A-Za-z]{1,30}$/.test (this.civilite));    
  }

  getValidationNom () : boolean {
    return (/^[A-Za-z]{1,30}$/.test (this.nom));    
  }

  getValidationPrenom () : boolean {
    return (/^[A-Za-z]{1,30}$/.test (this.prenom));    
  }

  getValidationAdresse () : boolean {
    return (/^[A-Za-z0-9 '-]{1,30}$/.test (this.adresse));    
  }

  getValidationCodePostal () : boolean {
    return (/^[0-9]{5}$/.test (this.cp));    
  }

  getValidationVille () : boolean {
    return (/^[A-Za-z '-]{1,30}$/.test (this.ville));    
  }

  getValidationPays () : boolean {
    return (/^[A-Za-z '-]{1,30}$/.test (this.pays));    
  }

  getValidationTel () : boolean {
    return (/^[0-9]{1,10}$/.test (this.tel));    
  }

  getValidationEmail () : boolean {
    return (/^[A-Za-z0-9@.-]{1,30}$/.test (this.email));    
  }

  getValidationLogin () : boolean {
    return (/^[A-Za-z0-9]{1,30}$/.test (this.login));    
  }

  getValidationPassword () : boolean {
    return (/^[A-Za-z0-9@*.+-/=]{1,30}$/.test (this.password));    
  }

  changeRecap (val : boolean) {
    this.recap = val
  }

  sendData () {
    this.recap = true;

    const formData = new FormData();
    formData.append('civilite', this.civilite);
    formData.append('nom', this.nom);
    formData.append('prenom', this.prenom);
    formData.append('adresse', this.adresse);
    formData.append('cp', this.cp);
    formData.append('ville', this.ville);
    formData.append('pays', this.pays);
    formData.append('tel', this.tel);
    formData.append('email', this.email);
    formData.append('login', this.login);
    formData.append('password', this.password);

    this.service.postClient(formData).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
