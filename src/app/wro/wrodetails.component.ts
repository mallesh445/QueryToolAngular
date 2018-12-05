import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';

@Component({
  selector: 'app-wrodetails',
  templateUrl: './wrodetails.component.html',
  styleUrls: ['./wrodetails.component.scss']
})
export class WrodetailsComponent implements OnInit {
  form:FormGroup;
  errorMessage:any;
  result:any;
    constructor(private fb: FormBuilder, private service: ShipbobService) { }
  
  formSubmit(){
    if(this.form.valid){
      this.service.getWRODetailsId(this.form.controls.wroId.value)
      .subscribe(
        res=>{
         // this.result=res.json();
        console.log(res);
        //res.json();
        this.result=res;

      },
      (error) => {
        console.log(error);
        this.errorMessage = error;
      }
      );
    }
  }
  
    ngOnInit() {
      this.form = this.fb.group({
        wroId: ['', Validators.required]
      });
    }

}
