import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/authentications/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {

    constructor(private authService: AuthService,
        private route: Router) { }

    tokenExpirou: any;
    ngOnInit(): void {
        this.tokenExpirou = this.authService.tokenExpire();
    }

    redirectPage = () => {
        if (this.tokenExpirou) {
            this.route.navigate(['./login'])
        } else {
            this.authService.logout();
        }
    }
}