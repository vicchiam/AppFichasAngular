import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';

declare var JQuery:any;
declare var $:any;

@Injectable()
export class TrademarkService{

    public url:string;

    constructor(
        public _http:Http
    ){
        this.url=GLOBAL.url+"/trademarks";
    }

    listTrademarks(name,state){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let post="name="+name+"&state="+state;
        return this._http.post(this.url+"/list",post,{headers: headers}).map(res=>res.json());
    }

    getAutocompleteData(state){
        return this._http.get(this.url+"/list/autocomplete/"+state).map(res=>res.json());
    }

    saveTrademark(trademark){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let post="id="+trademark.id+"&name="+trademark.name;
        return this._http.post(this.url+"/save",post,{headers: headers}).map(res=>res);
    }

    sendFile2(files: Array<File>){
        let documentData: any=new FormData();
        documentData.append("image",files[0],files[0].name);
        $.ajax(
            {
                url:this.url,
                type:"POST",
                data: documentData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    alert("Document uploaded successfully.");
                }
            }
        );
    }

    sendFile(files: Array<File>){
        var formData: any = new FormData();
        //for(var i = 0; i < files.length; i++){
            formData.append('upload', files[0], files[0].name);
        //}
        let headers = new Headers({'Content-Type':'multipart/form-data'});
        return this._http.post(this.url+"/upload",formData,{headers : headers}).map(res=>res);
    }

    makeFileRequest(params: Array<string>, files: Array<File>,trademark){
		return new Promise((resolve, reject)=>{
		    var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
                let fileName=trademark.name+"."+files[i].name.split('.').pop()
				formData.append('file', files[i], fileName);
			}

            xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(xhr.response);
					}else{
						reject(xhr.response);
					}
				}
			};

			xhr.open("POST", this.url+"/upload/"+trademark.id, true);
			xhr.send(formData);
        });
	}

    saveState(id){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let post="id="+id;
        return this._http.post(this.url+"/changeState",post,{headers: headers}).map(res=>res);
    }

}
