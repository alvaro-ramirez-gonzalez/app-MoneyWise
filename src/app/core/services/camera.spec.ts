import { TestBed } from '@angular/core/testing';
import { CameraService } from './camera'; // Cambiado de Camera a CameraService

describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraService); // Cambiado aquí también
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});