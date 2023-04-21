import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api
  constructor(private asHttpClient: HttpClient, private cookie:CookieService) { }

  public sendCredentials(email:string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.asHttpClient.post(`${this.URL}/auth/login`,body)
    .pipe(
      tap((ResponseOK: any) => {
        const { tokenSession, data} = ResponseOK
        this.cookie.set('token_en_service', tokenSession, 4, '/')
      })
    )
  }
}
