import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HomeComponent } from './home/home.component';
import { WroComponent } from './wro/wro.component';
import { UserStoreComponent } from './user-store/user-store.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ShipbobService } from './services/shipbob.service';
import { HttpClientModule } from '@angular/common/http';
import { WroinfoComponent } from './wro/wroinfo.component';
import { WrodetailsComponent } from './wro/wrodetails.component';
import { ModulelistComponent, QueryDialog } from './modulelist/modulelist.component';
import { ModulescriptsComponent } from './modulelist/modulescripts.component';
import { EditorupdateComponent } from './editorupdate/editorupdate.component';
import {SessionService} from './services/session.services';
import { CommonModule } from '@angular/common';
import { ExcelService } from './services/excel.service';
// import {BreadcrumbsModule} from "ng6-breadcrumbs";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WroComponent,
    UserStoreComponent,
    WroinfoComponent,
    WrodetailsComponent,
    ModulelistComponent,
    ModulescriptsComponent,
    EditorupdateComponent,QueryDialog
  ],
  imports: [
    CommonModule, MatToolbarModule, MatInputModule, MatTableModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [CommonModule, MatToolbarModule, MatInputModule, MatTableModule],
  providers: [
    ShipbobService,
    SessionService,
    ExcelService
  ],
  entryComponents: [QueryDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
