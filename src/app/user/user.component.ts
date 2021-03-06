import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/user/userservice.service';
import { AuthcheckService } from '../services/auth/authcheck.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../services/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(public userService: UserserviceService,
    public authService: AuthcheckService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder) 
    { }

    ngOnInit(): void {
      this.route.data.subscribe(routeData => {
        let data = routeData['data'];
        if (data) {
          this.user = data;
          console.log(data);
          this.createForm(this.user.name);
        }
      })
    }
  
    createForm(name) {
      this.profileForm = this.fb.group({
        name: [name, Validators.required ]
      });
    }
  
    save(value){
      this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err))
    }

}
