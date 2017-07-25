import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.services';
import { GLOBAL } from '../services/global';

import { User } from '../models/user';
import { Autocomplete } from './autocomplete.component';
import { PagerService } from '../services/pager.service';

declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'list-users',
  templateUrl: '../views/listUsers.component.html',
  providers: [UserService, PagerService]
})
export class ListUsersComponent{
    public title="Hola";

    public f_user:string;
    public f_mail:string;
    public f_type:number;
    public f_state:boolean;
    public changeState:boolean;//Modificamos el tick Ver Pasivos

    public users:Array<User>;

    public userNames:Array<string>;//Autocompletar nombre
    public userMails:Array<string>;//Autocompletar mails

    public pager: any;
    public pagedItems: Array<User>;

    //Form variables
    public editUser:User;

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
        this.changeState=true;

        this.pager={};
        this.pagedItems=[];

        this.editUser=new User(0,"","","",3,1);
    }

    ngOnInit(){
        this.getAutocompleteData();
        this.getUsers();
    }

    getTypeNames(){
        return GLOBAL.typeNames;
    }

    getTypeName(type:number){
        return GLOBAL.typeNames[type-1];
    }

    getUsers(){
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
        if(this.changeState){
            this._userService.getAutocompleteData(((this.f_state)?0:1)).subscribe(
                response => {
                    this.userNames=[];
                    this.userMails=[];
                    for(var i=0;i<response.user.length;i++){
                        this.userNames.push(response.user[i].user);
                        this.userMails.push(response.user[i].mail);
                    }
                    this.changeState=false;
                },
                error =>{
                    console.log(error);
                }
            );
        }
    }

    list(){
        this.getUsers();
        console.log(this.f_user+" "+this.f_mail+" "+this.f_type+" "+this.f_state);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
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

    setChangeState(){
        this.changeState=true;
    }

    /**********************USER************************************************/
    getUser(user){
        if(user){
            this.editUser=new User(user.id, user.user ,user.pass ,user.mail, user.type, user.state);
        }
        else{
            this.editUser=new User(0,"","","",3,1);
        }
        $('#myModal').modal('show');
    }

    saveUser(){
        this._userService.saveUser(this.editUser).subscribe(
            response => {
                if(response.text()=="ok"){
                    alert("Guardado correctamente");
                    $('#myModal').modal('hide');
                    this.list();
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

}
