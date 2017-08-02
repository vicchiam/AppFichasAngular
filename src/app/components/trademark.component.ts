import { Component} from '@angular/core';

import { Trademark } from '../models/trademark';
import { GLOBAL } from '../services/global';

import { TrademarkService } from '../services/trademark.service';

import { Autocomplete } from './autocomplete.component';
import { PagerService } from '../services/pager.service';

declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'list-trademarks',
  templateUrl: '../views/trademark.component.html',
  providers: [TrademarkService, PagerService]
})
export class TrademarkComponent{

    public f_name:string;
    public f_state:boolean;
    public changeFilterState:boolean;

    public trademarks:Array<Trademark>;

    public trademarkNames:Array<string>;

    public pager: any;
    public pagedItems: Array<Trademark>;

    public editTrademark:Trademark;
    public filesToUpload:Array<File>;

    public imagePath:string;

    constructor(
        public _trademarkService: TrademarkService,
        public _pagerService: PagerService
    ){
        this.f_name="";
        this.f_state=false;
        this.changeFilterState=true;

        this.trademarks=[];

        this.trademarkNames=[];

        this.pager={};
        this.pagedItems=[];

        this.editTrademark=new Trademark(0,"","",1);
        this.filesToUpload=[];

        this.imagePath=GLOBAL.rootUrl;
    }

    ngOnInit(){
        this.list();
    }

    list(){
        this._trademarkService.listTrademarks(this.f_name,((this.f_state)?0:1)).subscribe(
            response => {
                this.trademarks=[];
                if(!response){
                    console.log("Empty");
                }
                else if(!Array.isArray(response.trademark)){
                    this.trademarks.push(response.trademark);
                }
                else{
                    this.trademarks=response.trademark;
                }
                this.setPage(1);
            },
            error => {
                console.log(error);
            }
        );
        this.getAutocompleteData();
    }

    setPage(page: number) {
        if (page < 1 || (page > 1 && page > this.pager.totalPages)) {
            return;
        }
        this.pager = this._pagerService.getPager(this.trademarks.length, page,12);
        this.pagedItems = this.trademarks.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    setFilterName(event){
        this.f_name=event.selected;
    }

    setChangeFilterState(){
        this.changeFilterState=true;
    }

    getAutocompleteData(){
        if(this.changeFilterState){
            this._trademarkService.getAutocompleteData(((this.f_state)?0:1)).subscribe(
                response => {
                    this.trademarkNames=[];
                    for(var i=0;i<response.trademark.length;i++){
                        this.trademarkNames.push(response.trademark[i].name);
                    }
                    this.changeFilterState=false;
                },
                error =>{
                    console.log(error);
                }
            );
        }
    }

    getTrademark(trademark){
        $('#file').val('');
        if(trademark){
            this.editTrademark=new Trademark(trademark.id,trademark.name,trademark.path,trademark.state);
        }
        else{
            this.editTrademark=new Trademark(0,"","",1);
        }
        $('#modalTrademark').modal('show');
    }

    reset(e){
        e.form.reset();
        $('#file').val('');
    }

    fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
        if(this.filesToUpload && this.filesToUpload[0]){
            var reader = new FileReader();
            reader.onload = function () {
                $('#img_file').attr('src', reader.result);
            }
            reader.readAsDataURL(this.filesToUpload[0]);
        }
	}

    saveTrademark(){
        this._trademarkService.saveTrademark(this.editTrademark).subscribe(
            response => {
                if(response.text()=="ok"){
                    if(this.editTrademark.id==0 || this.filesToUpload.length==0){
                        alert("Guardado correctamente");
                        $('#modalTrademark').modal('hide');
                        this.list();
                    }
                    else{
                        this.saveImage();
                    }
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

    saveImage(){
        this._trademarkService.makeFileRequest([], this.filesToUpload,this.editTrademark).then((result) => {
			if(result=="ok"){
                alert("Guardado correctamente");
                $('#modalTrademark').modal('hide');
                this.list();
            }
            else{
                console.log(result);
            }
		}, (error) =>{
			console.log("Error:"+error);
		});
    }

    showChangeState(trademark){
        this.editTrademark=trademark;
        $('#modalStateTrademark').modal('show');
    }

    saveState(){
        this._trademarkService.saveState(this.editTrademark.id).subscribe(
            response => {
                if(response.text()=="ok"){
                    alert("Modificado correctamente");
                    $('#modalStateTrademark').modal('hide');
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
