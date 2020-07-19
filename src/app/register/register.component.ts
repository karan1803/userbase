import { Component, OnInit } from '@angular/core';
import { AuthcheckService } from '../services/auth/authcheck.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error_name: boolean;

  constructor(
    public authService: AuthcheckService,
    private router: Router,
    private fb: FormBuilder,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "glogo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
      this.matIconRegistry.addSvgIcon(
        "fblogo",
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.facebookLogoURL));
   }

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  
googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
facebookLogoURL="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res =>{
      this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res =>{
      this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res =>{
      this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  tryRegister(value){
    console.log(value);
    let name = this.registerForm.value.name;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;

    if(name){
      this.error_name = true;
    }else{
      this.error_name = false;
    }
    if(name && email && password){

    }else{
      return;
    }
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
