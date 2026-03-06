import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // [x] Estado persistente con BehaviorSubject
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Al iniciar, recuperamos la sesión si existe para que no se cierre al refrescar
    const savedSession = localStorage.getItem('user_session_active');
    if (savedSession) {
      this.currentUserSubject.next(JSON.parse(savedSession));
    }
  }

  // Método para el AuthGuard
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Registro: Guardamos los datos del usuario "creado"
  register(userData: any): boolean {
    localStorage.setItem('registered_user', JSON.stringify(userData));
    // Opcional: Auto-login tras registrar
    return this.login(userData.email, userData.password);
  }

  login(email: string, pass: string): boolean {
    // 1. Buscamos al usuario registrado
    const savedUser = JSON.parse(localStorage.getItem('registered_user') || '{}');
    
    // 2. Validamos credenciales y longitud de password (8 caracteres)
    if (savedUser.email === email && pass === savedUser.password && pass.length === 8) {
      
      // [x] IMPORTANTE: Guardamos la SESIÓN ACTIVA para que persista al recargar
      localStorage.setItem('user_session_active', JSON.stringify(savedUser));
      
      this.currentUserSubject.next(savedUser);
      return true;
    }
    return false;
  }

  logout() {
    // [x] Limpiamos solo la sesión activa, mantenemos al usuario registrado si quieres
    localStorage.removeItem('user_session_active');
    this.currentUserSubject.next(null);
  }
}