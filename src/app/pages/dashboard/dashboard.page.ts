import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; 
import { TransaccionService } from '../../core/services/transaccion.service';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics'; 
import { Transaccion } from '../../core/models/transaccion.model';
// [x] IMPORTANTE: Importar ModalController y el componente del formulario
import { ModalController } from '@ionic/angular';
import { NuevaTransaccionComponent } from '../transacciones/nueva-transaccion/nueva-transaccion.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  
  user: any = null;
  transactions: Transaccion[] = []; 
  
  totalBalance: number = 0; 
  totalIncome: number = 0;
  totalExpenses: number = 0;

  constructor(
    private authService: AuthService,
    private transaccionSvc: TransaccionService,
    private router: Router,
    // [x] Inyectar ModalController
    private modalCtrl: ModalController 
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe((userData: any) => {
      this.user = userData;
    });

    this.transaccionSvc.transacciones$.subscribe((data: Transaccion[]) => {
      // Mostramos las 5 más recientes en el Dashboard
      this.transactions = data.slice(0, 5); 
      this.calculateTotals(data);
    });
  }

  // [x] Función para abrir el formulario que creamos antes
  async abrirNuevaTransaccion() {
    await Haptics.impact({ style: ImpactStyle.Light }); // Vibración suave al tocar el botón
    
    const modal = await this.modalCtrl.create({
      component: NuevaTransaccionComponent,
      // Esto crea el efecto de "tarjeta" que sube hasta la mitad (iOS style)
      breakpoints: [0, 0.5, 0.85],
      initialBreakpoint: 0.5,
      handle: true // Añade la rayita para arrastrar el modal hacia abajo
    });

    return await modal.present();
  }

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