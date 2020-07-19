import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AuthguardService } from './services/auth/authguard.service';
import { AuthcheckService } from './services/auth/authcheck.service';
import { UserserviceService } from './services/user/userservice.service';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserResolver } from './user/user.resolver';




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, BrowserAnimationsModule, // imports firebase/auth, only needed for auth features
    MaterialModule,
    FlexLayoutModule,
    // npm install @angular/fire firebase --save 
    //npm install -g firebase-tools
    //npm i @angular/flex-layout
    //npm install @amcharts/amcharts4
  ],
  providers: [ AuthguardService, AuthcheckService, UserserviceService, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
