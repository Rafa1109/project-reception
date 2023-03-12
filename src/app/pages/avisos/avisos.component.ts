import { Component, OnInit, ViewChild } from "@angular/core";
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

    @ViewChild('mview') mview?: any;

    permissions = this.authService.currentUserTokenDetails;

    constructor(private route: Router,
        private guestApi: GuestApi,
        private authService: AuthService) {
        super();
    }

    canAdd: boolean = false;
    ngOnInit(): void {
        this.canAdd = this.permissions?.roles?.includes("ROLE_USER_WRITER");
        this.getData();
    }

    addAviso = () => {
        this.route.navigate(['form-aviso'])
    }

    avisos: AvisoCommand[] = [];
    lazyLoadTable = (e: any) => {
        this.getData()
    }

    totalItems: number = 0;
    getData = () => {
        lastValueFrom(
            this.guestApi.findAll()
        ).then((res: any) => {
            console.log(res);
            // this.avisos = res.guests;
            res.guests.forEach((obj: any) => {
                this.avisos.push(new AvisoCommand(obj));
            })
            this.totalItems = res.size;
            console.log('avisos', this.avisos)
        })
    }

    editAviso = (aviso: any) => {
        this.route.navigate(['form-aviso-edit'], {
            state: { data: aviso }
        })
    }
    
    readAviso = (aviso: AvisoCommand) => {
        console.log('onj', aviso)        
        this.guestApi.announced(aviso.id).subscribe({
            next: (result) => {
                console.log('result', result)
            }
        })

    }

    aviso: AvisoCommand = new AvisoCommand();
    title: string = 'Este é o aviso!';
    modalView = (obj: any) => {
        this.aviso = new AvisoCommand(obj);
        this.title = obj.guestTypeDesc;
        this.mview.openModal();
    }

    closeModal = (obj: any) => {
        this.aviso = new AvisoCommand(obj);
        this.readAviso(this.aviso)
        this.mview.closeModal();
        window.location.reload();
    }
}