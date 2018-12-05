import { Component, OnInit } from '@angular/core';
import { ShipbobService } from '../services/shipbob.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {SessionService} from '../services/session.services';

@Component({
  selector: 'app-modulescripts',
  templateUrl: './modulescripts.component.html',
  styleUrls: ['./modulescripts.component.scss']
})
export class ModulescriptsComponent implements OnInit {
form:FormGroup;
id:any;
sub:any;
result:any;
resultGrid:any;
columns:any;
columnNames:any = [];
errorMessage:any;
queryCondition:any;
para:Array<any>[] = [];

  constructor(private route: ActivatedRoute ,private service: ShipbobService, private mySession:SessionService) { }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.id=params['id']
      console.log("Id : "+this.id);
      this.service.getScriptDetailsByScriptId(this.id).subscribe(
        res=>{ 
          console.log(res);
          this.result=res;
          this.columns = Object.keys(res[0])
          this.mySession.session = res;
        },
        (error) => {
          console.log(error);
          this.errorMessage = error;
        }
      );
    });
  }

  onParaBlur(paraIndex:number, paraVaue:any ): void{
    console.log("blur");
    this.para[paraIndex] = paraVaue;
  }

  formSubmit(value:any){
   this.queryCondition = this.result[0].Script1 + " where ";

    this.result.forEach(script => {
      for(let i=0 ; i<script.Parameters.length;i++){      
        this.queryCondition += script.Parameters[i].ParameterName + " = " + this.para[i] ;        
        if(script.Parameters.length != i+1)
        {
          this.queryCondition += " and "
        }
      }      
    });
    console.log(this.queryCondition);
   // debugger;
    this.service.getDataFromDatabaseForScriptIdWithParameters(this.queryCondition).subscribe(
      resq=>{ 
        console.log(resq);
        this.resultGrid=resq;
        this.columnNames = Object.keys(resq[0])
        console.log(this.columnNames);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error;
      }
    );
    //console.log(value);
  }

}
