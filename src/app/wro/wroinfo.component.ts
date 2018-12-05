import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';

@Component({
  selector: 'app-wroinfo',
  templateUrl: './wroinfo.component.html',
  styleUrls: ['./wroinfo.component.scss']
})
export class WroinfoComponent implements OnInit {
form:FormGroup;
isFirstRequest:boolean=true;
errorMessage:any;
columns:any;
result:any;
  constructor(private fb: FormBuilder, private service: ShipbobService) { }

formSubmit(){
  this.isFirstRequest = false;
  if(this.form.valid){
    this.service.getWROInfoId(this.form.controls.wroId.value).subscribe(res=>{
      console.log(res);
      this.result=res;
      this.columns = Object.keys(res[0])
    },
    (error) => {
      console.log(error);
      this.errorMessage = error;
    }
    );
  }
}

  ngOnInit() {
    this.isFirstRequest=true;
    this.form = this.fb.group({
      wroId: ['', Validators.required]
    });
  }

}
