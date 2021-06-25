import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductModalPageRoutingModule } from './add-product-modal-routing.module';

import { AddProductModalPage } from './add-product-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddProductModalPageRoutingModule
  ],
  declarations: [AddProductModalPage]
})
export class AddProductModalPageModule {}
