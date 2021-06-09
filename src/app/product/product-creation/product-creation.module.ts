import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCreationPageRoutingModule } from './product-creation-routing.module';

import { ProductCreationPage } from './product-creation.page';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { FileSelectDirective, FileUploader, FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCreationPageRoutingModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'vint',api_key:'492594191163969',api_secret:'QT9AuT5V9XsZ9_MO9XJKDfvIeeg' }),
    FileUploadModule

  ],
  declarations: [ProductCreationPage],
    entryComponents: [
      FileSelectDirective,
      FileUploader,
      ],
})
export class ProductCreationPageModule {}
