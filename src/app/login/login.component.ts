import { Component, OnInit } from '@angular/core';
import { AuthcheckService } from '../services/auth/authcheck.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(public authService: AuthcheckService,
    private router: Router,
    private fb: FormBuilder,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) 
    {
      this.matIconRegistry.addSvgIcon(
        "glogo",
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
        this.matIconRegistry.addSvgIcon(
          "fblogo",
          this.domSanitizer.bypassSecurityTrustResourceUrl(this.facebookLogoURL));
      this.createForm();
     }
     googleLogoURL = 
     "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
     facebookLogoURL="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"

  ngOnInit(): void {
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
