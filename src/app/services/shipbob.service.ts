import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebApiUrls } from '../util/web-api-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipbobService {

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

getDataFromDatabaseForScriptIdWithParameters(data:any){
  return this.http.get(WebApiUrls.ScriptDetailsDataByScriptQuery +"?data="+data
    );
}

insertNewQueryInScripts(requiredInsertData: string): any {
  return this.http.get(WebApiUrls.InsertScriptQueryUrl +"?data="+requiredInsertData
  );
}

updateExistingQueryByScriptId(requiredInsertData: string): any {
  return this.http.get(WebApiUrls.UpdateScriptQueryUrl +"?data="+requiredInsertData
  );
}

}
