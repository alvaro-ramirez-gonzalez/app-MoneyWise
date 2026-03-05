import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaccion } from '../core/models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  // [x] Estado actualizado con BehaviorSubject
  private _transacciones = new BehaviorSubject<Transaccion[]>([]);
  public transacciones$ = this._transacciones.asObservable();

  constructor() {
    this.cargarDatosIniciales();
  }

  // Carga inicial para que la lista no esté vacía al probar
  private cargarDatosIniciales() {
    const data: Transaccion[] = [
      { id: '1', amount: 2500, category: 'Sueldo', type: 'income', date: new Date().toISOString(), note: 'Pago inicial' },
      { id: '2', amount: 450, category: 'Comida', type: 'expense', date: new Date().toISOString(), note: 'Supermercado' }
    ];
    this._transacciones.next(data);
  }

  // Método para añadir (se usará en el FormularioTransaccionModal)
  addTransaccion(nueva: Transaccion) {
    const actual = this._transacciones.value;
    this._transacciones.next([nueva, ...actual]);
  }

  // [x] Dashboard con cálculos en tiempo real
  getBalance(): Observable<number> {
    return this.transacciones$.pipe(
      map(list => list.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0))
    );
  }
}