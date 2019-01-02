import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.services';
import { Module } from '../modulelist/moduleentity.model';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-editorupdate',
  templateUrl: './editorupdate.component.html',
  styleUrls: ['./editorupdate.component.scss']
})
export class EditorupdateComponent implements OnInit {
  form: FormGroup;
  errorMessage: any;
  module_entity: Module;
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
  resultM: any;
  builtQueryControl: any;
  queryTitleControl: any;
  allModules: any;
  queryId: number = 0;
  selectedModuleTitle = "";

  constructor(private fb: FormBuilder, private service: ShipbobService, private router: Router, private route: ActivatedRoute, private mySession: SessionService) {
    this.queryTitleControl = new FormControl('', [Validators.required]);
    this.builtQueryControl = new FormControl('', [Validators.required]);
  }


  ngOnInit() {
    this.createFormControls();
    this.createForm();
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
        //debugger;
        editQuery = {};
        if (this.queryId > 0)
          this.InitializeForm(editQuery,this.queryId);
        else
          this.clearForm();
      }
    );
  }

  createFormControls() {
    this.queryTitleControl = new FormControl('', Validators.required);
  }

  createForm() {
    this.form = this.fb.group({
      queryTitle: ['', Validators.required],
      builtQuery: ['', Validators.required],
      selectedModule: [0, Validators.required]
    });
  }

  //Insert Query Method
  insertQuery() {
    this.module_entity = new Module(this.selectedModule, this.selectedOperation, this.builtQuery, this.queryTitle, this.queryId);
    this.requiredInsertData = JSON.stringify(this.module_entity);
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
        for (var module of this.allModules) {
          if (module.ModuleId == this.selectedModule) {
            this.selectedModuleTitle = module.Title;
            break;
          }
        }
        this.router.navigateByUrl("modulelist/" + this.selectedModule);
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

  //Update Query Method
  updateQuery() {
    this.module_entity = new Module(this.selectedModule, this.selectedOperation, this.builtQuery, this.queryTitle, this.queryId);
    this.requiredInsertData = JSON.stringify(this.module_entity);
    this.service.updateExistingQueryByScriptId(this.requiredInsertData).subscribe(
      resq => {
        this.result = resq;
      },
      (error) => {
        this.errorMessage = error;
      },
      (complete) => {
        for (var module of this.allModules) {
          if (module.ModuleId == this.selectedModule) {
            this.selectedModuleTitle = module.Title;
            break;
          }
        }
        this.router.navigateByUrl("modulelist/" + this.selectedModule);
        this.clearForm();
      }
    );
  }

  cancel() {
    // Simply navigate back to reminders view
    alert("Do you want to Cancel");
    if (this.selectedModule) {
      this.router.navigateByUrl("modulelist/" + this.selectedModule);
    } else {
      this.router.navigateByUrl("/");
    }
  }

  formSubmit() {
    console.log(this.selectedModule);
    this.requiredInsertData = this.selectedModule + "," + this.selectedOperation + "," + this.builtQuery + "," + this.queryTitle;
    console.log(this.requiredInsertData);
    const p = { ...this.form.value };
    console.log(p);
  }



  InitializeForm(query: any,queryId:number) {
    let queryArray=Object.values(query);
    //debugger;
    //if (query.Title!='undefined')
    if (queryArray.length>0){
      this.selectedModule = query.ModuleId;
      this.selectedOperation = query.OperationId;
      this.builtQuery = query.Script;
      this.queryTitle = query.Title;
    }
    else{
      this.service.getScriptDetailsByScriptId(queryId).subscribe(
        resmine => {
          this.resultM = resmine;
          this.resultM = Array.of(this.resultM);
          this.mySession.session = resmine;
          //debugger;
          console.log("mallesh : "+this.resultM);
          this.selectedModule=this.resultM[0].ModuleId;
          this.selectedOperation = this.resultM[0].OperationId;
          this.builtQuery = this.resultM[0].Script;
          this.queryTitle = this.resultM[0].Title;
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.errorMessage;
        }
      );
      this.queryTitle='';
    }
  }

}
export interface Module {
  value: string;
  viewValue: string;
}
