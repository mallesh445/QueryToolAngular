import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';


@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss']
})
export class CarrierComponent implements OnInit {
  form: FormGroup;
  errorMessage: any;
  result: any;
  constructor(private fb: FormBuilder, private service: ShipbobService) { }

formSubmit(){
  if(this.form.valid){
    console.log("carrierId");
    this.service.getCarrierId(this.form.controls.carrierId.value).subscribe(res => {
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
      carrierId: ['', Validators.required]
    })
  }

}
