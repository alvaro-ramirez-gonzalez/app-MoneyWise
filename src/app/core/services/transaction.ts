import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  // Nombre de la llave para el almacenamiento local
  private readonly STORAGE_KEY = 'moneywise_transactions';
  
  // Usamos BehaviorSubject para que todos los componentes vean los cambios en tiempo real
  private transactionsSubject = new BehaviorSubject<Transaccion[]>([]);
  public transactions$: Observable<Transaccion[]> = this.transactionsSubject.asObservable();

  constructor() {
    this.loadTransactions(); // Cargamos los datos apenas inicia la app
  }

  // RF-2: Cargar datos desde el LocalStorage
  private loadTransactions() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.transactionsSubject.next(JSON.parse(saved));
    }
  }

  // RF-2: Guardar una nueva transacción
  addTransaccion(transaction: Transaccion) {
    const current = this.transactionsSubject.value;
    const updated = [transaction, ...current]; // Agregamos la nueva al principio
    
    // Actualizamos el estado de la app
    this.transactionsSubject.next(updated);
    
    // Guardamos permanentemente en el dispositivo
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  // Extra: Eliminar una transacción
  deleteTransaction(id: string) {
    const filtered = this.transactionsSubject.value.filter(t => t.id !== id);
    this.transactionsSubject.next(filtered);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
}