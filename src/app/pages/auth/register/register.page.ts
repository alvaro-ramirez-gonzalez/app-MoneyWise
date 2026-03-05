import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false 
})
export class RegisterPage implements OnInit {
  // 1. Definimos el objeto que se vinculará al formulario
  user = { 
    name: '', 
    email: '', 
    password: '' 
  };

  constructor(
    private auth: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister() {
  // 1. Validación de Correo Electrónico (Regex estándar)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!this.user.email || !emailRegex.test(this.user.email)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return;
  }

  // 2. Validación de Contraseña (Exactamente 8 caracteres)
  if (!this.user.password || this.user.password.length !== 8) {
    alert('La contraseña debe tener exactamente 8 caracteres.');
    return;
  }

  // 3. Si todo es válido, procedemos al registro
  if (this.user.name) {
    this.auth.register(this.user);
    alert('Cuenta creada con éxito');
    this.router.navigate(['/login']);
  } else {
    alert('Por favor, ingresa tu nombre.');
  }
}}