import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   imagePath:string="../assets/images/ggkLogo.jpeg";
  //imagePath:string="../assets/images/Gear-5.4s-200px.gif";
  constructor() { }

  ngOnInit() {
  }

}
