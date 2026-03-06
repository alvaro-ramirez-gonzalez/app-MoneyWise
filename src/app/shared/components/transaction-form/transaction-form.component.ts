import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaccion } from '../../../core/models/transaccion.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  standalone: false
})
export class TransactionFormComponent {
  // Recibe una transacción para editar o una vacía para crear
  @Input() transaccion: Partial<Transaccion> = {
    type: 'expense',
    amount: 0,
    date: new Date().toISOString(),
    category: '',
    note: '',
    receipt: null,
    icon: ''  
  };

  // Categorías obligatorias según el Requisito 2
  categorias = ['Alimentación', 'Transporte', 'Vivienda', 'Salud', 'Ocio', 'Salario', 'Otros'];

  constructor(private modalCtrl: ModalController) {}

  cancelar() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmar() {
    return this.modalCtrl.dismiss(this.transaccion, 'confirm');
  }
}