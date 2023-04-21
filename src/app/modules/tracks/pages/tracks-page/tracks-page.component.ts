import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
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
