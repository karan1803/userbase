import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthcheckService } from '../services/auth/authcheck.service';
import { Location, TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  log: boolean =true;
  constructor(
    private router: Router,
    public authService: AuthcheckService,
    private activatedRoute:ActivatedRoute,
    private location: Location,
    ) { 
      
    }

  ngOnInit(): void {
    // this.routececk();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
    // this.routececk();
  }
  routececk(){
    let val = this.location.path();
    var one=val.indexOf("/");
    var finalroute= val.slice(one);
    if(finalroute == 'user'){
      this.log = true;
    }else{
      this.log = false;
    }
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/login']);
      // this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}

