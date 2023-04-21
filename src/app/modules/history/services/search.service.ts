import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private readonly URL = environment.api;

  constructor(private ashttpClient: HttpClient) { }

  searchTracks$(termSearch: string): Observable<any> {
    return this.ashttpClient.get(`${this.URL}/tracks?src={termSearch}`)

  }
}


// export class SearchService {
  
//   private compareTracksByName(a: { name: string }, b: { name: string }): number {
//     if (a.name < b.name) {
//       return -1;
//     } else if (a.name > b.name) {
//       return 1;
//     } else {
//       return 0;
//     }
//   }
  
//   private readonly URL = environment.api;

//   constructor(private ashttpClient: HttpClient) { }

//   searchTracks$(termSearch: string): Observable<any> {
//     return this.ashttpClient.get(`${this.URL}/tracks?src=${termSearch}`).pipe(
//       map((response: any) => {
//         console.log("DAME MI ARRAY",response);
        
//         const tracksArray = Object.values(response); // convert response object into array
//         const sortedTracks = tracksArray.sort((a: any, b: any) => {
//           if (a.name < b.name) {
//             return -1;
//           } else if (a.name > b.name) {
//             return 1;
//           } else {
//             return 0;
//           }
//         });
//         const topThreeTracks = sortedTracks.slice(0, 3);
//         return topThreeTracks;
//       })
//     );
//   }
// }