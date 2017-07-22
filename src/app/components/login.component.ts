import { Component} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from '../services/user.services';

@Component({
  selector: 'login',
  templateUrl: '../views/login.component.html',
  providers: [UserService]
})
export class LoginComponent{
    public user:string;
    public pass:string;

    public succes:boolean;

    constructor(
        public _userService:UserService,
        public route:ActivatedRoute,
        public _router:Router
    ){
        this.user="";
        this.pass="";
        this.succes=true;
    }

    login(){
        this._userService.login(this.user,this.pass).subscribe(
            response =>{
                if(response.user.user){
                    this.succes=true;
                    localStorage.setItem('currentUser', JSON.stringify(response.user));
                    this._router.navigate(['/']);
                }
                else{
                    this.succes=false;
                    console.log("Error");
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

}
