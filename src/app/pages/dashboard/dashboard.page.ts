import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; 
import { TransaccionService } from '../../core/services/transaccion.service'; // [x] Importado según estructura
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics'; 
import { Transaccion } from '../../core/models/transaccion.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  
  user: any = null;
  transactions: Transaccion[] = []; // Usamos el modelo creado
  
  totalBalance: number = 0; 
  totalIncome: number = 0;
  totalExpenses: number = 0;

  constructor(
    private authService: AuthService,
    private transaccionSvc: TransaccionService, // Inyectamos el cerebro de las finanzas
    private router: Router
  ) { }

  ngOnInit() {
    // [x] Corrección de tipo para userData (evita error TS7006)
    this.authService.currentUser$.subscribe((userData: any) => {
      this.user = userData;
    });

    // [x] Cargar transacciones y calcular totales en tiempo real
    this.transaccionSvc.transacciones$.subscribe((data: Transaccion[]) => {
      this.transactions = data.slice(0, 5); // Solo las últimas 5 para el dashboard
      this.calculateTotals(data);
    });
  }

  // Método para actualizar las tarjetas de colores del Dashboard
  private calculateTotals(items: Transaccion[]) {
    this.totalIncome = items
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    this.totalExpenses = items
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    this.totalBalance = this.totalIncome - this.totalExpenses;
  }

  async logout() {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium }); 
      await this.authService.logout(); 
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}