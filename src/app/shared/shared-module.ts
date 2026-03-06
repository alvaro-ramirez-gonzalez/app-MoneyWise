import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AmountDisplayComponent } from './components/amount-display/amount-display.component';
import { PhotoSelectorComponent } from './components/photo-selector/photo-selector.component';
import { FilterByTypePipe } from './pipes/filter';
import { SearchByTextPipe } from './pipes/search';

@NgModule({
  declarations: [
    AmountDisplayComponent,
    PhotoSelectorComponent,
    FilterByTypePipe,
    SearchByTextPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AmountDisplayComponent,
    PhotoSelectorComponent,
    FilterByTypePipe,
    SearchByTextPipe,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }