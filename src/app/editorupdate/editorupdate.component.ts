import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.services';
import { moduleentity } from '../modulelist/moduleentity.model';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-editorupdate',
  templateUrl: './editorupdate.component.html',
  styleUrls: ['./editorupdate.component.scss']
})
export class EditorupdateComponent implements OnInit {
  form: FormGroup;
  errorMessage: any;
  module_entity:moduleentity;
  ddl: any;
  editShow: boolean = true;
  columns: any;
  builtQuery: string;
  queryTitle: string;
  selectedModule: number;
  requiredInsertData: string;
  selectedOperation: number;
  parametersArray: Array<any>[] = [];
  result: any;
  allModules: any;
  queryId: number = 0;
  selectedModuleTitle = "";

  constructor(private fb: FormBuilder, private service: ShipbobService, private router: Router, private route: ActivatedRoute, private mySession: SessionService) { }

  insertQuery() { 
    this.module_entity = new moduleentity(this.selectedModule,this.selectedOperation,this.builtQuery,this.queryTitle);
    this.requiredInsertData=JSON.stringify(this.module_entity);
    this.service.insertNewQueryInScripts(this.requiredInsertData).subscribe(
      resq => {
        console.log(resq);
        this.result = resq;
      },

      (error) => {
        console.log(error);
        this.errorMessage = error;
      },
      (complete) => {
        for(var module of this.allModules)
        {      
          if (module.ModuleId == this.selectedModule) {
            this.selectedModuleTitle = module.Title;
            break;
          }
        }
        this.router.navigateByUrl("modulelist/" + this.selectedModuleTitle);
        this.clearForm();
      }
    );
  }

  clearForm() {
    this.selectedModule = 0;
    this.selectedModuleTitle = "";
    this.selectedOperation = 0;
    this.builtQuery = "";
    this.queryTitle = "";

  }

  formSubmit() {
    console.log(this.selectedModule);
    this.requiredInsertData = this.selectedModule + "," + this.selectedOperation + "," + this.builtQuery + "," + this.queryTitle;
    console.log(this.requiredInsertData);
    const p = { ...this.form.value };
    console.log(p);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.queryId = params['id']
    });
    var editQuery = this.mySession.session;
    console.log(editQuery);

    this.service.getAllModules().subscribe(resModule => {
      console.log(resModule);
      this.allModules = resModule;
    },
      (error) => {
        console.log(error);
        this.errorMessage = error;
      },
      () => {
        if(this.queryId > 0)
        this.InitializeForm(editQuery);
        
      }
    );
  }


  InitializeForm(query: object) {
    this.selectedModule = query[0].ModuleId;
    this.selectedOperation = query[0].OperationId;
    this.builtQuery = query[0].Script1;

  }

}
export interface Module {
  value: string;
  viewValue: string;
}
