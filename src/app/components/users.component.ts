import { Component} from '@angular/core';

import { UserService } from '../services/user.services';
import { GLOBAL } from '../services/global';

import { User } from '../models/user';
import { Autocomplete } from './autocomplete.component';
import { PagerService } from '../services/pager.service';

declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'list-users',
  templateUrl: '../views/users.component.html',
  providers: [UserService, PagerService]
})
export class UsersComponent{
    public title="Hola";

    public f_user:string;
    public f_mail:string;
    public f_type:number;
    public f_state:boolean;
    public changeFilterState:boolean;//Modificamos el tick Ver Pasivos

    public users:Array<User>;

    public userNames:Array<string>;//Autocompletar nombre
    public userMails:Array<string>;//Autocompletar mails

    public pager: any;
    public pagedItems: Array<User>;

    //Form variables
    public editUser:User;

    public pass:string;
    public passr:string;

    constructor(
        public _userService:UserService,
        public _pagerService: PagerService
    ){
        this.userNames=[];
        this.userMails=[];
        this.f_user="";
        this.f_mail="";
        this.f_type=0;
        this.f_state=false;
        this.changeFilterState=true;

        this.pager={};
        this.pagedItems=[];

        this.editUser=new User(0,"","","",3,1);
    }

    ngOnInit(){
        this.getAutocompleteData();
        this.list();
    }

    getTypeNames(){
        return GLOBAL.typeNames;
    }

    getTypeName(type:number){
        return GLOBAL.typeNames[type-1];
    }

    list(){
        this._userService.listUsers(this.f_user, this.f_mail, this.f_type, ((this.f_state)?0:1)).subscribe(
            response =>{
                this.users=[];
                if(!response){
                    console.log("Empty");
                }
                else if(!Array.isArray(response.user)){
                    this.users.push(response.user);
                }
                else{
                    this.users=response.user;
                }
                this.setPage(1);
            },
            error =>{
                console.log(error);
            }
        );
        this.getAutocompleteData();
    }

    getAutocompleteData(){
        if(this.changeFilterState){
            this._userService.getAutocompleteData(((this.f_state)?0:1)).subscribe(
                response => {
                    this.userNames=[];
                    this.userMails=[];
                    for(var i=0;i<response.user.length;i++){
                        this.userNames.push(response.user[i].user);
                        this.userMails.push(response.user[i].mail);
                    }
                    this.changeFilterState=false;
                },
                error =>{
                    console.log(error);
                }
            );
        }
    }

    setPage(page: number) {
        if (page < 1 || (page > 1 && page > this.pager.totalPages)) {
            return;
        }
        this.pager = this._pagerService.getPager(this.users.length, page,10);
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    setFilterUser(event){
        this.f_user=event.selected;
    }

    setFilterMail(event){
        this.f_mail=event.selected;
    }

    setChangeFilterState(){
        this.changeFilterState=true;
    }

    /**********************USER************************************************/
    getUser(user){
        if(user){
            this.editUser=new User(user.id, user.user ,user.pass ,user.mail, user.type, user.state);
        }
        else{
            this.editUser=new User(0,"","","",3,1);
        }
        $('#modalUser').modal('show');
    }

    saveUser(){
        this._userService.saveUser(this.editUser).subscribe(
            response => {
                if(response.text()=="ok"){
                    alert("Guardado correctamente");
                    $('#modalUser').modal('hide');
                    this.list();
                }
                else{
                    alert("No se ha podido modificar");
                    console.log(response);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    reset(e){
        e.form.reset();
    }

    /*******************PASS***************************************************/
    changePass(user){
        this.editUser=new User(user.id, user.user ,user.pass ,user.mail, user.type, user.state);
        $('#modalPassUser').modal('show');
    }

    savePass(){
        this._userService.savePass(this.editUser.id,this.pass).subscribe(
            response =>{
                if(response.text()=="ok"){
                    alert("Modificado correctamente");
                    $('#modalPassUser').modal('hide');
                }
                else{
                    alert("No se ha podido modificar");
                    console.log(response);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    /*************STATE********************************************************/
    showChangeState(user){
        this.editUser=user;
        $('#modalStateUser').modal('show');
    }

    saveState(){
        this._userService.saveState(this.editUser.id).subscribe(
            response => {
                if(response.text()=="ok"){
                    alert("Modificado correctamente");
                    $('#modalStateUser').modal('hide');
                    this.list();
                }
                else{
                    alert("No se ha podido modificar");
                    console.log(response);
                }
            },
            error => {
                console.log("Error");
            }
        );
    }

}
