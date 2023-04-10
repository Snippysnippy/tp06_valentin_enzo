import { Component, Output, OnInit, Input, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-recap-saisie-client',
  templateUrl: './recap-saisie-client.component.html',
  styleUrls: ['./recap-saisie-client.component.scss']
})
export class RecapSaisieClientComponent {
  @Input() nom : string = "";
  @Input() prenom : string = "";
  @Input() civilite : string = "";
  @Input() adresse : string = "";
  @Input() cp : string = "";
  @Input() ville : string = "";
  @Input() pays : string = "";
  @Input() tel : string = "";
  @Input() email : string = "";
  @Input() login : string = "";
  @Input() password : string = "";

  
  @Output() recap: EventEmitter<boolean> = new EventEmitter<boolean>();

  Close () {
    this.recap.emit(false);
  }
}
