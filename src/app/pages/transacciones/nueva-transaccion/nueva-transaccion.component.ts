// src/app/pages/transacciones/nueva-transaccion/nueva-transaccion.component.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransaccionService } from '../../../core/services/transaccion.service';

@Component({
  selector: 'app-nueva-transaccion',
  templateUrl: './nueva-transaccion.component.html',
  standalone: false
})
export class NuevaTransaccionComponent {
  monto: number = 0;
  tipo: 'income' | 'expense' = 'expense';
  categoria: string = '';

  constructor(private modalCtrl: ModalController, private transaccionSvc: TransaccionService) {}

  guardar() {
    if (this.monto <= 0) return;
    
    this.transaccionSvc.addTransaccion({
      id: Date.now().toString(),
      amount: this.monto,
      type: this.tipo,
      category: this.categoria || 'Varios',
      date: new Date().toISOString()
    });
    
    this.modalCtrl.dismiss();
  }
}