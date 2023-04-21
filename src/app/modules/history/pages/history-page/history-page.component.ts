import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([])

  constructor(private asSearchService: SearchService) { }

  ngOnInit(): void {

  }

  receiveData(event: string): void {
    //agarras el termino y sabes que solo se ejecuta cuando hay al menos 3 caracteres
    console.log("Estoy en el Componente Padre History", event);
    this.listResults$ = this.asSearchService.searchTracks$(event)
    .pipe(
      map((dataRaw:any) => dataRaw.data) 
    )
  }

}
