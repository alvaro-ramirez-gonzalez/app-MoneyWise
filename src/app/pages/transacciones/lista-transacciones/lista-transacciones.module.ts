import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListaTransaccionesPageRoutingModule } from './lista-transacciones-routing.module';
import { ListaTransaccionesPage } from './lista-transacciones.page';

// Sube 3 niveles: lista-transacciones -> transacciones -> pages -> app
import { SharedModule } from '../../../shared/shared-module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTransaccionesPageRoutingModule,
    SharedModule // Activa searchByText y filterByType
  ],
  declarations: [ListaTransaccionesPage]
})
export class ListaTransaccionesPageModule {}