import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipbobService } from '../services/shipbob.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../services/session.services';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ExcelService } from '../services/excel.service';
import { ScriptEntity } from './ScriptEntity.Model';
import { Parameter } from './Parameter.Model';
import { ExportToCSV } from "@molteni/export-csv";
import { MyErrorStateMatcher } from '../Models/ErrorStateMatcher';

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
  isDataFound: boolean;
  scriptEntity: ScriptEntity;
  isRequiredException: boolean = false;
  RequiredMessage: string;
  isAllowPagination: boolean = true;
  isSpinnerRunning: boolean = false;
  imagePath: string = "../assets/images/load_machines.gif";
  matcher = new MyErrorStateMatcher();
  parametersResult: any;
  isFirstime: boolean = true;

  constructor(private route: ActivatedRoute,
    private service: ShipbobService,
    private mySession: SessionService,
    private excelService: ExcelService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.isFirstime=true;
    this.isDataFound = true;
    //debugger;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.service.getScriptDetailsByScriptId(this.id).subscribe(
        res => {
          this.result = res;
          this.result = Array.of(this.result);
          // this.columns = Object.keys(res[0])
          this.mySession.session = res;
          this.showPagination = true;
          // latest change 
          this.result.forEach(data => {
            console.log(data.Parameters);
            this.parametersResult = data.Parameters;
            this.form = this.service.getDynamicForm(data.Parameters);
            
          });
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.errorMessage;
        }
      );
    });
  }

  // isValidFlag: boolean = false;
  // get isValid() {
  //   this.isValidFlag = this.parametersResult.forEach(res => {
  //     // debugger;
  //     return this.form.controls[res.parameterName].valid;
  //   });
  //   // return this.isValidFlag;
  //   if (this.isValidFlag == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  isValidation(value: any) {
   
    // console.log( this.form.controls[value]);
    
    if(this.form.controls[value].valid) {
      return true;
    }
    return false;
  }


  onParaBlur(paraIndex: number, paraVaue: any): void {
    this.isFirstime=false;
    console.log("blur");
    this.para[paraIndex] = paraVaue;
    if (!paraVaue) {
      this.isRequiredException = true;
      this.RequiredMessage = "This " + this.result[0].Parameters[paraIndex].parameterName + " field is required";
    }
    else {
      this.isRequiredException = false;
      this.RequiredMessage = null;
    }
  }

  allowPagination() {
    if (this.resultGrid != null) {
      if (this.isAllowPagination) {
        this.isAllowPagination = false;
      } else {
        this.isAllowPagination = true;
      }
      this.formSubmit();
    }
  }

  formSubmit() {
    this.isSpinnerRunning = true;
    this.disableDIV = false;
    this.dataSource = null;
    this.errorMessage = null;
    this.queryCondition = this.result[0].Script;
    let parameters: Parameter[] = [];
    let parameter: Parameter;

    console.log(this.queryCondition);

    for (let i = 0; i < this.result[0].Parameters.length; i++) {
      parameter = new Parameter(this.result[0].Parameters[i].parameterName, this.para[i].toString());
      parameters.push(parameter);
    }
    this.scriptEntity = new ScriptEntity(this.result[0].ScriptId, this.result[0].ModuleId, this.result[0].OperationId,
      this.result[0].Script, this.result[0].Table, this.result[0].Title, parameters);
    console.log(this.scriptEntity);

    this.service.getDataFromDatabaseForScriptIdWithParameters(this.scriptEntity).subscribe(
      resq => {
        console.log(resq);
        this.resultGrid = resq;
        this.columnNames = Object.keys(resq[0]);
        console.log(this.columnNames);
        this.dataSource = new MatTableDataSource(this.resultGrid);
        if (this.dataSource.filteredData.length > 0) {
          this.disableDIV = true;
          this.isDataFound = true;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.errorMessage;
        this.isDataFound = false;
      }
    ).add(() => this.isSpinnerRunning = false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.resultGrid, 'ExcelData');
  }

  exportAsCSV(): void {
    var exporter = new ExportToCSV();
    exporter.exportColumnsToCSV(this.resultGrid, "CsvData.csv", this.columnNames);
    //exporter.exportAllToCSV(this.resultGrid,"csvfilename.csv");
  }
}
