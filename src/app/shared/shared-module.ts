import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el currency pipe
import { IonicModule } from '@ionic/angular'; // Para componentes ion-
import { FormsModule } from '@angular/forms';

// Importa con los nombres EXACTOS que exportaste en los archivos de pipes
import { FilterPipe } from './pipes/filter';
import { SearchPipe } from './pipes/search';
import { AmountDisplayComponent } from './components/amount-display/amount-display.component';
import { PhotoSelectorComponent } from './components/photo-selector/photo-selector.component';

@NgModule({
  declarations: [
    AmountDisplayComponent,
    PhotoSelectorComponent,
    FilterPipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    AmountDisplayComponent,
    PhotoSelectorComponent,
    FilterPipe,
    SearchPipe,
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class SharedModule { }