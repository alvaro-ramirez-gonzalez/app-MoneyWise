import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { Transaccion } from '../../../core/models/transaccion.model'; // Importamos la interfaz

@Component({
  selector: 'app-nueva-transaccion',
  templateUrl: './nueva-transaccion.component.html',
  standalone: false
})
export class NuevaTransaccionComponent {
  // Mantenemos variables en español para el [(ngModel)] del HTML si prefieres, 
  // pero las mapeamos al inglés al guardar.
  monto: number = 0;
  tipo: 'income' | 'expense' = 'expense';
  categoria: string = '';
  
  // RF-3: Variable para recibir la foto de la cámara
  fotoComprobante: string | null = null;

  constructor(
    private modalCtrl: ModalController, 
    private transaccionSvc: TransaccionService
  ) {}

  // Método para capturar el evento del PhotoSelectorComponent
  manejarFoto(foto: string) {
    this.fotoComprobante = foto;
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (this.monto <= 0 || !this.categoria) return; // Validación básica
    
    // Creamos el objeto siguiendo la interfaz Transaccion en inglés
    const newTransaction: Transaccion = {
      id: Date.now().toString(),
      amount: this.monto,
      type: this.tipo,
      category: this.categoria,
      date: new Date().toISOString(),
      receipt: this.fotoComprobante // RF-3: Guardamos la imagen
    };
    
    this.transaccionSvc.addTransaccion(newTransaction);
    this.modalCtrl.dismiss();
  }
}