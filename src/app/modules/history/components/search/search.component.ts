import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackData: EventEmitter<any> = new EventEmitter()
  
  src: string = ''
  
  constructor() {}

  ngOnInit(): void {
    
  }

  callSearch(termSearch: string): void{
    if(termSearch.length >= 3){
      this.callbackData.emit(termSearch)
      console.log("-----> LLamamos a la API HTTP GET", termSearch);
    }
  }
}
