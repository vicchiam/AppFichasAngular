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

    listUsers(user,mail,type,state){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let post="user="+user+"&mail="+mail+"&type="+type+"&state="+state;
        return this._http.post(this.url+"/list",post,{headers: headers}).map(res=>res.json());
    }

    getAutocompleteData(state){
        return this._http.get(this.url+"/list/autocomplete/"+state).map(res=>res.json());
    }

    getUser(id){
        return this._http.get(this.url+"/get/"+id).map(res=>res.json());
    }

    saveUser(user){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let post="id="+user.id+"&user="+user.user+"&mail="+user.mail+"&type="+user.type;
        return this._http.post(this.url+"/save",post,{headers: headers}).map(res=>res);
    }

}
