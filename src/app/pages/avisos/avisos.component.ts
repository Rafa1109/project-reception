import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";
import { BaseForm } from "src/app/components/base-form/base-form.component";
import { AvisoCommand } from "src/app/core/api/avisos/command/avisos.command";
import { GuestApi } from "src/app/core/api/avisos/guest-api.controller";
import { AuthService } from "src/app/core/services/authentications/auth.service";

@Component({
    selector: 'app-avisos',
    templateUrl: './avisos.component.html'
})
export class AvisosComponent extends BaseForm implements OnInit {

    permissions = this.authService.currentUserTokenDetails;

    constructor(private route: Router,
        private guestApi: GuestApi,
        private authService: AuthService)
    {
        super();
    }
    
    canAdd: boolean = false;
    ngOnInit(): void {
        this.canAdd = this.permissions?.roles.includes("ROLE_USER_WRITER");
        this.lazyLoadTable(null);
    }

    addAviso = () => {
        this.route.navigate(['form-aviso'])
    }

    avisos: any[] = [];
    lazyLoadTable = (e: any) => {
        console.log('e', e)
        lastValueFrom(
            this.guestApi.findAll()
        ).then((res: any) => {
            console.log(res);
            this.avisos = res;        
        })

        this.avisos.push({"tipo": "VISITANTES", "nome": "NOME TESTE"})
    }
}