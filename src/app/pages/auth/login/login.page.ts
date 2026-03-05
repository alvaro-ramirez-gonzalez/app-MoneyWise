import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false 
})
export class LoginPage implements OnInit {
  loginData = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() { }

  onLogin() {
    const success = this.auth.login(this.loginData.email, this.loginData.password);
    if (success) {
      this.router.navigate(['/tabs/dashboard']);
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  }
}