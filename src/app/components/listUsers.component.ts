import { Component} from '@angular/core';

import { UserService } from '../services/user.services';
import { GLOBAL } from '../services/global';

import { User } from '../models/user';

@Component({
  selector: 'list-users',
  templateUrl: '../views/listUsers.component.html',
  providers: [UserService]
})
export class ListUsersComponent{
    public title="Hola";

    public f_user:string;
    public f_mail:string;
    public f_type:number;

    public users:Array<User>;

    constructor(
        public _userService:UserService
    ){

    }

    ngOnInit(){
        this.getUsers();
    }

    getTypeNames(){
        return GLOBAL.typeNames;
    }

    getTypeName(type:number){
        return GLOBAL.typeNames[type-1];
    }

    getUsers(){
        this._userService.listUsers().subscribe(
            response =>{
                this.users=response.user;
            },
            error =>{
                console.log(error);
            }
        );
    }

    list(){
        console.log(this.f_user+" "+this.f_mail+" "+this.f_type);
    }

}
