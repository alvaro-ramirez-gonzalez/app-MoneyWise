import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// [x] Importante: Importar FormsModule para que funcionen los formularios
import { FormsModule } from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NuevaTransaccionComponent } from './pages/transacciones/nueva-transaccion/nueva-transaccion.component';
import { SharedModule } from './shared/shared-module';

@NgModule({
  declarations: [
    AppComponent, 
    NuevaTransaccionComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    // [x] Añadir FormsModule aquí para habilitar [(ngModel)]
    FormsModule,
    SharedModule 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}