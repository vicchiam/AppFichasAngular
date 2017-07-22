import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public url:string;

    constructor(
        public _http:Http
    ){
        this.url=GLOBAL.url+"/users";
    }

    login(user,pass){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let post="user="+user+"&pass="+pass;
        return this._http.post(this.url+"/login",post,{headers: headers}).map(res=>res.json());
    }

    logout(){
        localStorage.removeItem('currentUser');
    }

    listUsers(){
        return this._http.get(this.url+"/list").map(res=>res.json());
    }

}
