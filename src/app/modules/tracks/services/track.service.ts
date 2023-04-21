import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  //programacion reactiva -> observable con signo dolar al final -> necesitamos suscribirnos o nunca vamos a obtener la data 
  // dataTracksTrending$ : Observable<TrackModel[]> = of([])

  // dataTracksRandom$ : Observable<any> = of([])

  private readonly URL = environment.api;

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  constructor(private ashttpClient: HttpClient) {}

  getAllTracks$(): Observable<any> {
    return this.ashttpClient.get(`${this.URL}/tracks`)
    .pipe(
      map(({data}: any) => {
        return data
      })
    )
  }

  getAllRandom$(): Observable<any> {
    return this.ashttpClient.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap(({ data }: any) => this.skipById(data, 4)),
        // map((dataRevertida) => { //TODO aplicar un filter comun de array
        //   return dataRevertida.filter((track: TrackModel) => track._id !== 1)
        // })
        catchError((err) => {
          const { status, statusText } = err;
          return of([])
        })
      )
  }

};
