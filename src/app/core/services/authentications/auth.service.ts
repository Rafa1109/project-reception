import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable } from "rxjs";
import { LoginCommand } from "../../api/avisos/command/login.command";
import { GuestApi } from "../../api/avisos/guest-api.controller";
import { DecodedJwt } from "../crypt/decode-jwt.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    result: any;

    constructor(
        private router: Router, private guestApi: GuestApi,
        private localStorage: LocalStorageService,
        private decodeJwt: DecodedJwt) {
        this.currentUserSubject = new BehaviorSubject<any>(
            this.getLocalStorageItem('currentUser')
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        const user = this.getLocalStorageItem('currentUser');
    
        if (user) {
          this.currentUserSubject.next(user);
        }
        return this.currentUserSubject.value;
      }

    public get currentUserTokenDetails(): any {
        return this.getLocalStorageItem('user-token-details');
    }

    private getLocalStorageItem(item: string): any {
        return this.localStorage.getData(item);
    }

    login(login: string, password: string): Observable<any> {
        let command = new LoginCommand(login, password);
        return this.guestApi.login(command).pipe(
            map((result: any) => {
                this.localStorage.saveData('currentUser', result);
                this.currentUserSubject.next(result);
                this.tokenDetails(result.token)
                return result;
            })
        )
    }

    logout(): void {
        this.localStorage.removeData('currentUser');
        this.localStorage.removeData('user-token-details');

        this.currentUserSubject.next(null);
        this.router.navigate(['/login']).then(() => {
        })
    }

    tokenDetails(token: string): any {
        let decoded = this.decodeJwt.decodeJWT(token);
        this.localStorage.saveData('user-token-details', decoded ?? "");
        return decoded;
    }

    tokenExpire(): any {        
        return this.decodeJwt.isTokenExpired(this.currentUserTokenDetails);
    }
}