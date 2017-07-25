import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.services';
import { GLOBAL } from '../services/global';

import { User } from '../models/user';

@Component({
  selector: 'edit-user',
  templateUrl: '../views/editUser.component.html',
})
export class EditUserComponent{

    public id:number;
    public user:string;
    public mail:string;
    public type:number;

    constructor(
        public _userService: UserService,
        private _route: ActivatedRoute,
		private _router: Router
    ){

    }

    ngOnInit(){
        this.iniciarUsuario();
    }

    iniciarUsuario(){
        this.id=0;
        this._route.params.forEach((params: Params) => {
            this.id = params['id'];
        });
        console.log("ID:"+this.id);
        if(this.id==0){
            this.user="";
            this.mail="";
            this.type=3;
        }
        else{
            this._userService.getUser(this.id).subscribe(
                response =>{
                    if(response){
                        this.user=response.user;
                        this.mail=response.mail;
                        this.type=response.type;
                        console.log(this.user+" "+this.mail+" "+this.type);
                    }
                    else{
                        console.log("Error");
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    getTypeNames(){
        return GLOBAL.typeNames;
    }

}
