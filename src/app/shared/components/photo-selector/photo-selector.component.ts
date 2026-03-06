import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CameraService } from '../../../core/services/camera';

@Component({
  selector: 'app-photo-selector',
  template: `
    <ion-button (click)="seleccionar()" expand="block" fill="outline">
      <ion-icon name="camera" slot="start"></ion-icon>
      {{ fotoActual ? 'Cambiar Foto' : 'Tomar Foto' }}
    </ion-button>
    <img *ngIf="fotoActual" [src]="fotoActual" style="width: 100%; border-radius: 8px; margin-top: 10px;"/>
  `,
  standalone: false
})
export class PhotoSelectorComponent {
  @Input() fotoActual: string | null = null;
  @Output() onFotoSeleccionada = new EventEmitter<string>();

  constructor(private cameraSvc: CameraService) {}

  async seleccionar() {
    const foto = await this.cameraSvc.takePhoto();
    if (foto) this.onFotoSeleccionada.emit(foto);
  }
}