import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/services/auth.service';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics'; 
import { Transaction } from '../../core/models/transaction.model'; // 👈 Importación movida arriba

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  // Variables para el usuario y datos
  user: any = null;
  transactions: Transaction[] = []; // 👈 Ahora está correctamente dentro de la clase
  
  // Variables de balance para la vista
  totalBalance: number = 5240.50; 
  totalIncome: number = 1200.00;
  totalExpenses: number = 45.00;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Suscripción para obtener los datos del usuario logueado
    this.authService.currentUser$.subscribe(userData => {
      this.user = userData;
    });
  }

  // Función asíncrona para soportar los plugins de Capacitor
  async logout() {
    try {
      // Feedback táctil con Haptics antes de salir
      await Haptics.impact({ style: ImpactStyle.Medium }); 
      
      await this.authService.logout(); //
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}