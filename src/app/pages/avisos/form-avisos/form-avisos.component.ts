import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { BaseForm } from "src/app/components/base-form/base-form.component";
import { AvisoCommand } from "src/app/core/api/avisos/command/avisos.command";
import { GuestApi } from "src/app/core/api/avisos/guest-api.controller";
import { ENUMS } from "src/app/core/enum";


@Component({
    selector: 'app-form-avisos',
    templateUrl: './form-avisos.component.html'
})
export class FormAvisosComponent extends BaseForm implements OnInit {

    avisoForm: AvisoCommand = new AvisoCommand();
    formEdit: any;

    tipoAvisos = [
        { id: ENUMS.VISITANTE, tipo: 'VISITANTES' },
        { id: ENUMS.AVISO_RECADO, tipo: 'AVISOS / RECADOS' },
        { id: ENUMS.ANIVERSARIO, tipo: 'ANIVERSÁRIO' },
        { id: ENUMS.ORACAO, tipo: 'PEDIDO DE ORAÇÃO' },
        { id: ENUMS.APRESENTACAO, tipo: 'APRESENTAÇÃO CRIANÇA' }
    ]

    constructor(
        private fb: UntypedFormBuilder,
        private route: Router,
        private guestApi: GuestApi,
        private messageService: MessageService
    ) {
        super();

        let statePage = this.route.getCurrentNavigation()?.extras.state;
        this.formEdit = statePage?.['data'] ?? null;
    }

    ngOnInit(): void {
        this.createForm();
        if (this.formEdit) {
            this.editAviso();
        }
    }

    createForm = () => {
        this.form = this.fb.group({
            tipo: [''],
            data: [''],
            pais: [''],
            crianca: [''],
            visitante: [''],
            frenquentaIgreja: [''],
            igreja: [''],
            convidadoPor: [''],
            avisoRecado: [''],
            tipoAniversário: [''],
            idade: [''],
            aniversariante: [''],
            nomePedido: [''],
            oracaoPara: [''],
            message: ['']
        })
    }

    editAviso = () => {
        this.avisoForm = new AvisoCommand(this.formEdit);
    }

    selectedTipo: number = 0;
    onChangeTipo = (event: any) => {
        this.selectedTipo = event.value;
    }

    laoding: boolean[] = [false];
    onSave = () => {
        console.log('command', this.avisoForm);
        this.laoding[0] = true;
        this.guestApi.save(this.avisoForm).subscribe({
            next: (result) => {
                console.log('result', result);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Salvo com sucesso!',
                    detail: 'Redirecionando Página!',
                    life: 3000
                })
                this.route.navigate(['avisos']);
            }, complete: () => {
                this.laoding[0] = false;
            }
        })
    }

    back = () => {
        this.route.navigate(['avisos'])
    }
}