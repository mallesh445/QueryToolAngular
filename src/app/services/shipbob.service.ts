import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebApiUrls } from '../util/web-api-urls';
import { Observable } from 'rxjs';
import { ScriptEntity } from '../modulelist/ScriptEntity.Model';
import { ModuleScript } from '../Models/ModuleScript';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShipbobService {
  UpdateQueryTitleByQueryId(id: string, title: string): any {
    return this.http.post(WebApiUrls.ordersUrl , {id,title});
  }

  constructor(private http: HttpClient) { }

  //Retrieving OrderId details through API
  getOrderId(id: any) {
    return this.http.get(WebApiUrls.ordersUrl //+ id
      );
  }

  //Retrieving OrderId details through API
  getCarrierId(id:any){
    return this.http.get(WebApiUrls.carriersUrl +id
    );
  }

  getRuleId(id:any){
    // return this.http.get(WebApiUrls.ruleidUrl //+id
      return this.http.get(WebApiUrls.ruleidUrl +id
      );
  }

  getWROInfoId(id:any){
      return this.http.get(WebApiUrls.wroinfoURL +id
      );
  }

  getWRODetailsId(id:any){
    return this.http.get(WebApiUrls.wrodetailsUrl +id
    );
}

getWROPackingInfoId(id:any){
  return this.http.get(WebApiUrls.wropackinginfoURL +id
  );
}

getAllModules(){
  return this.http.get(WebApiUrls.allModulesUrl 
  );
  }

  getModulesListByModuleId(id:any){
   // console.log(id+" Mallesh")
    return this.http.get(WebApiUrls.ModuleListByIdUrl +id
    );
}   
getScriptDetailsByScriptId(id:any){
  // console.log(id+" Mallesh")
   return this.http.get(WebApiUrls.ScriptDetailsByScriptIdUrl +id
   );
}

getDataFromDatabaseForScriptIdWithParameters(scriptentity: ScriptEntity){
  return this.http.post(WebApiUrls.ScriptDetailsDataByScriptQuery, scriptentity );
}

insertNewQueryInScripts(requiredInsertData: string): any {
  return this.http.get(WebApiUrls.InsertScriptQueryUrl +"?data="+requiredInsertData
  );
}

updateExistingQueryByScriptId(requiredInsertData: string): any {
  return this.http.get(WebApiUrls.UpdateScriptQueryUrl +"?data="+requiredInsertData
  );
}

getDynamicForm(dynamicForm : ModuleScript<any>[]){
  let group: any = {};
  dynamicForm.forEach(dynamicData => {
    // console.log(dynamicData.required);

      group[dynamicData.parameterName] = dynamicData.required ? new FormControl( '' , Validators.required)
                                              : new FormControl('');
    });
    return new FormGroup(group);
}

// getQuestions() {
//   let questions: any[] = [
//     {
//       controlName : 'firstName',
//       label : "First Name",
//       required : true,
//       order : 1,
//       controlType  : 'textbox'

//     },

//     {
//       controlName : 'country',
//       label : "Country",
//       required : true,
//       order : 2,
//       controlType  : 'dropdown',
//       options : 
//       [{key : 'India' , value : "India"},
//       {key : 'Pakistan' , value : "Pakistan"},
//       {key : 'Canada' , value : "Canada"}
    
//     ]

//     },
//     {
//       controlName : 'gender',
//       label : "Gender",
//       required : true,
//       order : 3,
//       value : "Female",
//       controlType  : 'radio',
//       options : 
//       [{key : 'Male' , value : "Male"},
//       {key : 'Female' , value : "Female"}]

//     },

//     {
//       controlName : 'checkbox',
//       label : "I am not a robot",
//       required : true,
//       order : 4,
//       value : 'true',
//       controlType  : 'checkbox'
//     }

//   ];

//   return questions.sort((a, b) => a.order - b.order);
// }


}
