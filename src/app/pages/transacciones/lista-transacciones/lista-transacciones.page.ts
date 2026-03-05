import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { Transaccion } from '../core/models/transaccion.model';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit {
  allTransactions: Transaccion[] = [];
  filteredTransactions: Transaccion[] = [];
  filterType: string = 'all';
  searchTerm: string = '';

  constructor(private transaccionSvc: TransaccionService) {}

  ngOnInit() {
    // Escuchamos el BehaviorSubject del core service
    this.transaccionSvc.transacciones$.subscribe(data => {
      this.allTransactions = data;
      this.filterData();
    });
  }

  handleSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterData();
  }

  filterData() {
    this.filteredTransactions = this.allTransactions.filter(t => {
      const matchesType = this.filterType === 'all' || t.type === this.filterType;
      const matchesSearch = t.category.toLowerCase().includes(this.searchTerm) || 
                            (t.note?.toLowerCase().includes(this.searchTerm));
      return matchesType && matchesSearch;
    });
  }
}
