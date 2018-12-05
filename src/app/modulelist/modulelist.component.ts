import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipbobService } from '../services/shipbob.service';


@Component({
  selector: 'app-modulelist',
  templateUrl: './modulelist.component.html',
  styleUrls: ['./modulelist.component.scss']
})
export class ModulelistComponent implements OnInit {
  id:any;
  sub:any;
  result:any;
  errorMessage:any;
  constructor(private route: ActivatedRoute ,private service: ShipbobService) {} 
  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => { 
    this.id = params['id']
    console.log(this.id);
    this.service.getModulesListByModuleId(this.id).subscribe(
      res=>{ 
      console.log(res);
      this.result=res;
     
    },
    (error) => {
      console.log(error);
      this.errorMessage = error;
    }
    );
  });

} 

  // (+) converts string 'id' to a number // In a real app: dispatch action to load the details here. });  
 

}
