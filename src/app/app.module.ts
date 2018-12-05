import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RulesComponent } from './rules/rules.component';
import { WroComponent } from './wro/wro.component';
import { UserStoreComponent } from './user-store/user-store.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ShipbobService } from './services/shipbob.service';
import { HttpClientModule } from '@angular/common/http';
import { CarrierComponent } from './carrier/carrier.component';
import { WroinfoComponent } from './wro/wroinfo.component';
import { WrodetailsComponent } from './wro/wrodetails.component';
import { WropackinginfoComponent } from './wro/wropackinginfo.component';
import { WrobinsComponent } from './wro/wrobins.component';
import { ModulelistComponent } from './modulelist/modulelist.component';
import { ModulescriptsComponent } from './modulelist/modulescripts.component';
import { EditorupdateComponent } from './editorupdate/editorupdate.component';
import {SessionService} from './services/session.services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    InventoryComponent,
    RulesComponent,
    WroComponent,
    UserStoreComponent,
    CarrierComponent,
    WroinfoComponent,
    WrodetailsComponent,
    WropackinginfoComponent,
    WrobinsComponent,
    ModulelistComponent,
    ModulescriptsComponent,
    EditorupdateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ShipbobService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
