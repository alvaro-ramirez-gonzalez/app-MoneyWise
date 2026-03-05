import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  
  // Mantenemos la estructura de datos del usuario
  user: any = null;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    // [x] Corrección: Tipamos 'data' como 'any' para eliminar el error TS7006 de tu terminal
    this.authService.currentUser$.subscribe((data: any) => {
      this.user = data;
    });
  }

  // Método para obtener iniciales (útil para el avatar en el HTML)
  get userInitials(): string {
    if (this.user && this.user.name) {
      return this.user.name.charAt(0).toUpperCase();
    }
    return 'U';
  }

  async logout() {
    // [x] Logout limpio usando el servicio del Core
    await this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}