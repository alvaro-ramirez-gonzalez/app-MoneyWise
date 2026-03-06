import { TestBed } from '@angular/core/testing';

// Corregimos la ruta y el nombre del servicio para que coincida con transaccion.service.ts
import { TransaccionService } from './transaccion.service'; 

describe('TransaccionService', () => {
  let service: TransaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Inyectamos el nombre correcto de la clase definida en tu servicio
    service = TestBed.inject(TransaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});