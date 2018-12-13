import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipbobService } from '../services/shipbob.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {SessionService} from '../services/session.services';
import {MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-modulescripts',
  templateUrl: './modulescripts.component.html',
  styleUrls: ['./modulescripts.component.scss']
})
export class ModulescriptsComponent implements OnInit {
form:FormGroup;
disableDIV: boolean=false;
id:any;
dataSource:any;
sub:any;
result:any;
resultGrid:any;
columns:any;
columnNames:any = [];
errorMessage:any;
queryCondition:any;
showPagination:boolean = false;
para:Array<any>[] = [];

  constructor(private route: ActivatedRoute ,private service: ShipbobService, private mySession:SessionService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
          this.showPagination = true;
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
   this.errorMessage=null;
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
        this.dataSource = new MatTableDataSource(this.resultGrid);
        if(this.dataSource.filteredData.length>0){
          this.disableDIV=true;
        }
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error;
      }
    );
    //console.log(value);
  }

  tableToExcel(table, resultGrid){
    let uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
        , format = function(s,c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
  }
}
