import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup ({ });

  constructor(private asAuthService: AuthService, private cookie:CookieService, private asRouter: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[ 
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value

//AQUI ESTAMOS RECIBIENDO LA INFORMACION JSON DE LA API

    this.asAuthService.sendCredentials(email, password)
      .subscribe(ResponseOk => {
        console.log("session iniciada correcta", ResponseOk)
        const { data: { token }, ...rest } = ResponseOk
        this.cookie.set('Token_bueno', token, 1, '/') //AQUI ESTAMOS GUARDANDO LA COOKIE
        this.asRouter.navigate(['/','tracks'])
      },
        err => {
          this.errorSession = true
          console.log("Ocurrio error en email o password");
        })
  }
}
