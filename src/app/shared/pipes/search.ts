import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({
  name: 'searchByText',
  standalone: false 
})
export class SearchByTextPipe implements PipeTransform {
  transform(items: Transaccion[], searchText: string): Transaccion[] {
    if (!items) return [];
    if (!searchText) return items;

    const text = searchText.toLowerCase();
    // Filtra por el texto en la descripción/nota
    return items.filter(it => it.category.toLowerCase().includes(text));
  }
}