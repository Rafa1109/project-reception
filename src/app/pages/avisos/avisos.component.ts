import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";
import { BaseForm } from "src/app/components/base-form/base-form.component";
import { GuestApi } from "src/app/core/api/avisos/guest-api.controller";

@Component({
    selector: 'app-avisos',
    templateUrl: './avisos.component.html'
})
export class AvisosComponent extends BaseForm implements OnInit {

    constructor(private route: Router,
        private guestApi: GuestApi) {
        super();
    }
    
    ngOnInit(): void {
        this.getData();
    }

    addAviso = () => {
        this.route.navigate(['form-aviso'])
    }

    avisos: any[] = [];
    getData = () => {
        /*lastValueFrom(
            this.guestApi.findAll()
        ).then((res: any) => {
            this.avisos = res;        
        })*/
        this.avisos.push({tipo: 'VISITANTES', nome: 'NOME TESTE'})
    }

    lazyLoadTable = (e: any) => {

    }
}