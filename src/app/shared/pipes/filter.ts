import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({
  name: 'filterByType',
  standalone: false
})
export class FilterByTypePipe implements PipeTransform {
  transform(items: Transaccion[], type: string): Transaccion[] {
    if (!items || !type || type === 'all') return items;
    return items.filter(item => item.type === type);
  }
}