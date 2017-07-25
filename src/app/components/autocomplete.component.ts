import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: '../views/autocomplete.component.html'
})
export class Autocomplete{

    public query = '';

    @Input() data:Array<any>;
    @Output() shareSelected = new EventEmitter();

    public filteredList = [];
    public elementRef;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    filter() {
        if (this.query !== ""){
            this.filteredList = this.data.filter(function(el){
                return (el.toLowerCase().substr(0,this.query.length) === this.query.toLowerCase()) == true;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
        //console.log("Filtered list"+this.filteredList );
    }

    select(item){
        this.query = item;
        this.filteredList = [];
        this.getSelected();
    }

    blur(){
        console.log(this.query);
        this.getSelected();
    }

    handleClick(event){
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if(!inside){
            this.filteredList = [];
        }
    }

    getSelected(){
        this.shareSelected.emit({selected: this.query});
    }

}
