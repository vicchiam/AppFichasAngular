import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from './services/user.services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService]
})
export class AppComponent {
  public title = 'Fichas clientes';
  public login:boolean;


  constructor(
      public _userService:UserService,
      public route:ActivatedRoute,
      public _router:Router
  ){
      this.login=false;
  }

  ngOnInit(){

      let user=JSON.parse(localStorage.getItem("currentUser"));
      if(user && user.user){
          this.login=true;
      }

      if(!this.login){
          this._router.navigate(['/login']);
      }
      else{
         // this._router.navigate(['/home']);
      }
  }

  logout(){
      this._userService.logout();
      this._router.navigate(['/login']);
  }

}
