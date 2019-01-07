import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipbobService } from '../services/shipbob.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  title: string;
  id: string;
}

@Component({
  selector: 'app-modulelist',
  templateUrl: './modulelist.component.html',
  styleUrls: ['./modulelist.component.scss']
})
export class ModulelistComponent implements OnInit {
  id: any;
  sub: any;
  result: any;
  errorMessage: any;
  animal: string;
  name: string;

  constructor(private route: ActivatedRoute, private service: ShipbobService, private dialog: MatDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      console.log(this.id);
      this.service.getModulesListByModuleId(this.id).subscribe(
        res => {
          console.log(res);
          this.result = res;

        },
        (error) => {
          console.log(error);
          this.errorMessage = error;
        }
      );
    });

  }

  
  deleteModuleList(Id: number) {
    this.service.DeleteQueryTitleByQueryId(Id).subscribe(
      resq => {
        this.result = resq;
      },
      (error) => {
        this.errorMessage = error;
      },
      (complete) => {
      }
    );
  }

  openDialog(Id: number, title: string) {
    console.log(Id);
    const dialogRef = this.dialog.open(QueryDialog, {
      width: '250px',
      data: { id: Id, title:title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

  // (+) converts string 'id' to a number // In a real app: dispatch action to load the details here. });  
 

@Component({
  selector: 'QueryDialog',
  templateUrl: 'QueryDialog.html',
})
export class QueryDialog {
  queryForm:FormGroup;
  constructor(private fb: FormBuilder,private service: ShipbobService,public dialogRef: MatDialogRef<QueryDialog>,
    @Inject(MAT_DIALOG_DATA,) public data: DialogData) { }

    ngOnInit() {
      this.queryForm = this.fb.group({
        queryTitle: ['', Validators.required]
      });
    }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  UpdateTitle():void{
    let a=this.queryForm.controls.queryTitle.value;
    this.service.UpdateQueryTitleByQueryId(this.data.id,this.queryForm.controls.queryTitle.value);
    this.dialogRef.close(true);
  }

}

