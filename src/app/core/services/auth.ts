import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  /**
   * Indica si el usuario está autenticado.
   * En un caso real podría validar un token o revisar el estado global.
   */
  isAuthenticated(): boolean {
    // TODO: implementar lógica real; por ahora devolvemos false
    return false;
  }
}
