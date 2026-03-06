import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { Transaccion } from '../../../core/models/transaccion.model';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit {
  // Simplificamos: Usamos una sola lista y dejamos que los Pipes filtren en el HTML
  transactions: Transaccion[] = [];
  
  // Variables vinculadas al [(ngModel)] del HTML para los Pipes
  filterType: 'all' | 'income' | 'expense' = 'all';
  searchText: string = '';

  constructor(private transaccionSvc: TransaccionService) {}

 ngOnInit() {
  // Cambia transactions$ por transacciones$ para que coincida con el servicio
  this.transaccionSvc.transacciones$.subscribe((data: Transaccion[]) => { 
    this.transactions = data;
  });
}}