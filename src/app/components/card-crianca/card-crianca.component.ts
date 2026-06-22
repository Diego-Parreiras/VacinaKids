import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Crianca } from '../../model/crianca';

@Component({
  selector: 'app-card-crianca',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-crianca.component.html',
  styleUrls: ['./card-crianca.component.css']
})
export class CardCriancaComponent {
  /** 
   * Recebe os dados da criança instanciada pelo componente pai.
   */
  @Input() public crianca!: Crianca;
}