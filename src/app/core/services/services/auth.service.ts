import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para manejar el estado del usuario en tiempo real
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Al iniciar, revisamos si ya hay un usuario en el almacenamiento del celular
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Método que usa tu AuthGuard para dar permiso
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Lógica de Registro
  register(userData: any): boolean {
    localStorage.setItem('user_session', JSON.stringify(userData));
    this.currentUserSubject.next(userData);
    return true;
  }

 login(email: string, pass: string): boolean {
  const savedUser = JSON.parse(localStorage.getItem('user_session') || '{}');
  
  // Validamos que el correo coincida y que la contraseña tenga exactamente 8
  if (savedUser.email === email && pass === savedUser.password && pass.length === 8) {
    this.currentUserSubject.next(savedUser);
    return true;
  }
  return false;
}
  // Cerrar sesión
  logout() {
    localStorage.removeItem('user_session');
    this.currentUserSubject.next(null);
  }
}