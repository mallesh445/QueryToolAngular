import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  form: FormGroup;
  errorMessage: any;
  result: any;
  constructor(private fb: FormBuilder, private service: ShipbobService) { }

formSubmit(){
  if(this.form.valid){
    console.log("ruleId");
    this.service.getRuleId(this.form.controls.ruleId.value).subscribe(res => {
      console.log(res);
      this.result = res;
    },
    (error) => {
      console.log(error);
      this.errorMessage = error;
    }
    );
  }
}

  ngOnInit() {
    this.form=this.fb.group({
      ruleId: ['', Validators.required]
    })
  }

}
