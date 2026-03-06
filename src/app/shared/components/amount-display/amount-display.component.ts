import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount-display',
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss'],
  standalone: false // Asegúrate de que sea false para usarlo en el SharedModule
})
export class AmountDisplayComponent implements OnInit {

  // [x] Propiedades de entrada según el requerimiento 4.6
  @Input() monto: number = 0;
  @Input() tipo: 'ingreso' | 'gasto' | 'neutral' = 'neutral';
  @Input() tamano: 'small' | 'medium' | 'large' = 'medium';

  constructor() { }

  ngOnInit() {}
}