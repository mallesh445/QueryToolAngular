import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShipbobService } from '../services/shipbob.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  form: FormGroup;
  errorMessage: any;
  result: any;
  constructor(private fb: FormBuilder, private service: ShipbobService) { }

  formSubmit() {
   if(this.form.valid) {
    this.service.getOrderId(this.form.controls.orderId.value).subscribe(res => {
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
    this.form = this.fb.group({
      orderId: ['', Validators.required]
    });
  }

}
