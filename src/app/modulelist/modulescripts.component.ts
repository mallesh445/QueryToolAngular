import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipbobService } from '../services/shipbob.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../services/session.services';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ExcelService } from '../services/excel.service';
import { ScriptEntity } from './ScriptEntity.Model';
import { Parameter } from './Parameter.Model';

@Component({
  selector: 'app-modulescripts',
  templateUrl: './modulescripts.component.html',
  styleUrls: ['./modulescripts.component.scss']
})
export class ModulescriptsComponent implements OnInit {
  form: FormGroup;
  disableDIV: boolean = false;
  id: any;
  dataSource: any;
  sub: any;
  result: any;
  resultGrid: any;
  columns: any;
  columnNames: any = [];
  errorMessage: any;
  queryCondition: string;
  showPagination: boolean = false;
  para: Array<any>[] = [];
  isDataFound:boolean;
  scriptEntity:ScriptEntity;
  isRequiredException:boolean=false;
  RequiredMessage:string;

  constructor(private route: ActivatedRoute, private service: ShipbobService, private mySession: SessionService, private excelService: ExcelService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.isDataFound = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.service.getScriptDetailsByScriptId(this.id).subscribe(
        res => {
          this.result = res;
          this.result = Array.of(this.result);
          // this.columns = Object.keys(res[0])
          this.mySession.session = res;
          this.showPagination = true;
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.errorMessage;
        }
      );
    });
  }

  onParaBlur(paraIndex: number, paraVaue: any): void {
    console.log("blur");
    this.para[paraIndex] = paraVaue;
    if(!paraVaue){
      this.isRequiredException=true;
      this.RequiredMessage= "This "+this.result[0].Parameters[paraIndex].parameterName+" field is required";
    }
  }

  formSubmit() {
    this.disableDIV=false;
    this.dataSource=null;
    this.errorMessage = null;
    this.queryCondition = this.result[0].Script;
    let parameters:Parameter[]=[];
    let parameter:Parameter;
    // this.result.forEach(script => {
    //   for (let i = 0; i < script.Parameters.length; i++) {
        
    //     //this.queryCondition += script.Parameters[i].parameterName + " = " + this.para[i];
    //     this.queryCondition = this.queryCondition.replace("@"+script.Parameters[i].parameterName,this.para[i].toString());
    //   }
    // });
    
    //Here removing the string after where condition.
    // this.queryCondition = this.queryCondition.substring(0, this.queryCondition.indexOf("where")) + " where ";
    // this.result.forEach(script => {
    //   for (let i = 0; i < script.Parameters.length; i++) {
    //     this.queryCondition += script.Parameters[i].parameterName + " = " + this.para[i];
    //     if (script.Parameters.length != i + 1) {
    //       this.queryCondition += " and "
    //     }
    //   }
    // });
    console.log(this.queryCondition);

    for(let i=0;i < this.result[0].Parameters.length;i++)
    {
      parameter = new Parameter(this.result[0].Parameters[i].parameterName,this.para[i].toString());
      parameters.push(parameter);
    }
    this.scriptEntity = new ScriptEntity(this.result[0].ScriptId,this.result[0].ModuleId,this.result[0].OperationId,
      this.result[0].Script,this.result[0].Table,this.result[0].Title,parameters);
      console.log(this.scriptEntity);
    
    this.service.getDataFromDatabaseForScriptIdWithParameters(this.scriptEntity).subscribe(
      resq => {
        console.log(resq);
        this.resultGrid = resq;
        this.columnNames = Object.keys(resq[0])
        console.log(this.columnNames);
        this.dataSource = new MatTableDataSource(this.resultGrid);
        if (this.dataSource.filteredData.length > 0) {
          this.disableDIV = true;
          this.isDataFound = true;
        }
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.errorMessage;
        this.isDataFound = false;
      }
    );
    //console.log(value);
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.resultGrid, 'sampledataq');
  }
}
