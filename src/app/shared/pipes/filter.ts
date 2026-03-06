import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({
  name: 'filterByType',
  standalone: false
})
export class FilterPipe implements PipeTransform {
  transform(transactions: Transaccion[], type: 'all' | 'income' | 'expense'): Transaccion[] {
    if (!type || type === 'all') return transactions;
    
    // Filtramos usando la propiedad 'type' en inglés
    return transactions.filter(t => t.type === type);
  }
}