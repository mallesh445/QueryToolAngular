import { Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { ShipbobService } from '../app/services/shipbob.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  result:any;
  fillerNav = [
    {name: "Home", routerLink: "/"},
    {name: "Orders", routerLink: "/orders"},
    {name: "Inventory", routerLink: "/inventory"},
    {name: "Carrier", routerLink: "/carrier"},
    {name: "WRO", routerLink: "/wro"},
    {name: "User store", routerLink: "/userstore"},
    {name: "Rules", routerLink: "/rules"}
  ]
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private service: ShipbobService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  this.service.getAllModules().subscribe(res=>
    {
      console.log(res);
      this.result=res;
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

 }

