import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wro',
  templateUrl: './wro.component.html',
  styleUrls: ['./wro.component.scss']
})
export class WroComponent implements OnInit {

  filterWROList=[
    {name: "Home", routerLink: "/"},
    {name: "Orders", routerLink: "/orders"},
    {name: "Inventory", routerLink: "/inventory"},
    {name: "Carrier", routerLink: "/carrier"},
    {name: "WRO", routerLink: "/wro"},
    {name: "User store", routerLink: "/userstore"},
    {name: "Rules", routerLink: "/rules"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
