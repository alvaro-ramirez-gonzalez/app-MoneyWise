import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({
  name: 'searchByText',
  standalone: false
})
export class SearchPipe implements PipeTransform {
  transform(transactions: Transaccion[], text: string): Transaccion[] {
    if (!text || text.trim() === '') return transactions;
    
    // Ahora buscamos en 'category' en lugar de 'categoria'
    return transactions.filter(t => 
      t.category.toLowerCase().includes(text.toLowerCase())
    );
  }
}