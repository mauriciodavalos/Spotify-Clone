import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit, OnDestroy{
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = [] 


  listObservers$: Array<Subscription> = []


  constructor(private asTrackService: TrackService) {}


  ngOnInit(): void {
    this.loadDataAll() //TODO 📌📌
    this.loadDataRandom() //TODO 📌📌
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.asTrackService.getAllTracks$().toPromise()

  }

  loadDataRandom(): void {
    this.asTrackService.getAllRandom$()
      .subscribe((response: TrackModel[]) => {
        this.tracksRandom = response
      })
  }

  ngOnDestroy(): void {

  }
}
