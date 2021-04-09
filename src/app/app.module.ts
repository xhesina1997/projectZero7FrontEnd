import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/intercepter';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from './product/product.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product/product.effects';
import {  CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, StoreModule.forRoot({products: ProductReducer}, {}), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  EffectsModule.forRoot([ProductEffects]),CloudinaryModule.forRoot(Cloudinary,{cloud_name:'vint'})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent],
})
export class AppModule {}
