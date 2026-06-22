import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Campanha } from '../../model/campanha';

@Component({
  selector: 'app-card-campanha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-campanha.component.html',
  styleUrls: ['./card-campanha.component.css']
})
export class CardCampanhaComponent {
  /** * Recebe os dados da campanha instanciada pelo componente pai.
   */
  @Input() public campanha!: Campanha;
}