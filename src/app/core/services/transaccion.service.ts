import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaccion } from '../models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  // [x] Cargamos desde el almacenamiento local para que no empiece de cero cada vez
  private _transacciones = new BehaviorSubject<Transaccion[]>(this.loadFromStorage());
  public transacciones$ = this._transacciones.asObservable();

  constructor() {}

  // [x] Función para leer los datos guardados en el dispositivo
  private loadFromStorage(): Transaccion[] {
    const saved = localStorage.getItem('moneywise_transactions');
    return saved ? JSON.parse(saved) : []; // Si no hay nada, devuelve lista vacía []
  }

  // [x] Método para añadir y GUARDAR permanentemente
  addTransaccion(nueva: Transaccion) {
    const actual = this._transacciones.value;
    const nuevaLista = [nueva, ...actual];
    
    // Guardamos en el disco del celular
    localStorage.setItem('moneywise_transactions', JSON.stringify(nuevaLista));
    
    // Notificamos a toda la app del cambio
    this._transacciones.next(nuevaLista);
  }

  // [x] Cálculos automáticos para el Dashboard
  getBalance(): Observable<number> {
    return this.transacciones$.pipe(
      map(list => list.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0))
    )
  }
}