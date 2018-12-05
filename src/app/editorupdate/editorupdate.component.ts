import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormArray, Validators, FormControl } from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';
import { Routes, Router } from '@angular/router';
import {SessionService} from '../services/session.services';

@Component({
  selector: 'app-editorupdate',
  templateUrl: './editorupdate.component.html',
  styleUrls: ['./editorupdate.component.scss']
})
export class EditorupdateComponent implements OnInit {
  form:FormGroup;
  errorMessage:any;
  ddl:any;
  editShow:boolean=true;
  columns:any;
  builtQuery:string;
  selectedModule:string = "";
  requiredInsertData:string;
  selectedOperation:string;
  parametersArray:Array<any>[] = [];
  result:any;
  allModules:any;
  
    constructor(private fb: FormBuilder, private service: ShipbobService, private router:Router, private mySession:SessionService) { }
  
    insertQuery(){

      for (let item of this.form.value.items) {
        this.parametersArray.push(item);
     }

      console.log(JSON.stringify(this.parametersArray));

      console.log(this.selectedModule+this.selectedOperation);
      this.requiredInsertData=this.selectedModule+","+this.selectedOperation+","+this.builtQuery+","+this.parametersArray;
      console.log("requiredInsertData:  "+ this.requiredInsertData);
      this.service.insertNewQueryInScripts(this.requiredInsertData).subscribe(
        resq=>{ 
          console.log(resq);
          this.result=resq;
        },
        
        (error) => {
          console.log(error);
          this.errorMessage = error;
        },
        (complete) => {
          this.router.navigateByUrl("modulelist/"+ this.selectedModule);
        }
      );
    }
    formSubmit(){
      console.log(this.selectedModule);
      this.requiredInsertData=this.selectedModule+","+this.selectedOperation+","+this.builtQuery;
      console.log(this.requiredInsertData);
      const p = {  ...this.form.value };
      console.log(p);
    }
  ngOnInit() {
    var editQuery = this.mySession.session;
    console.log("session");
    console.log(editQuery);
    

    this.createForm();
    this.service.getAllModules().subscribe(resModule=>{
      this.allModules=resModule;
    },
    (error) => {
      console.log(error);
      this.errorMessage = error;
    },
    () => {      
   // this.InitializeForm(editQuery);
    }
    );
  }

  createForm() {
    this.form = this.fb.group({
    name: [''],
    items: this.fb.array([this.createArray()])
  });
}
createArray(): FormControl {
   return new FormControl();
}

get items(): FormArray {
 return this.form.get('items') as FormArray;
}
addItems() {
  this.items.push(this.createArray())
}
removeItem(index: any) {
  if(index >= 1) {
     this.items.removeAt(index);
  }
}

InitializeForm(query:object){
   this.selectedModule = query[0].ModuleId;
   this.selectedOperation = query[0].OperationId;
}

}
export interface Module {
  value: string;
  viewValue: string;
}
