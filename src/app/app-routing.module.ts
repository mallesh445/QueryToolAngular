import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WroComponent } from './wro/wro.component';
import { UserStoreComponent } from './user-store/user-store.component';
import { WrodetailsComponent } from './wro/wrodetails.component';
import { WroinfoComponent } from './wro/wroinfo.component';
import { ModulelistComponent } from './modulelist/modulelist.component';
import { ModulescriptsComponent } from './modulelist/modulescripts.component';
import { EditorupdateComponent } from './editorupdate/editorupdate.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home', component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    }
  },
  { path: 'wro', component: WroComponent },
  { path: 'userstore', component: UserStoreComponent },
  { path: 'wrodetails', component: WrodetailsComponent },
  { path: 'wroinfo', component: WroinfoComponent },
  { path: 'modulelist/:id', component: ModulelistComponent, data: { breadcrumb: 'Modulelist' } },
  { path: 'modulescripts/:id', component: ModulescriptsComponent, data: { breadcrumb: 'Modulescripts' } },
  { path: 'editorupdate/:id', component: EditorupdateComponent, data: { breadcrumb: 'Editorupdate' } }
  // ,{
  //     path: 'modulelist/:id/:breadcrumb',
  //     component: ModulelistComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
