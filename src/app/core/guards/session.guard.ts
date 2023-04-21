import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private ascookieService:CookieService, private asrouter: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession(); // REVISA EL TOKEN, podria checar el ROLE
  }
  
  checkCookieSession():boolean {
    try{

      const token:boolean = this.ascookieService.check('Token_bueno')
      if (!token){
        this.asrouter.navigate(['/','auth'])
      }
      return token
      
    } catch(e){
      console.log('ups algo sucedio en el login', e);
      return false
      
    }
  }

}
