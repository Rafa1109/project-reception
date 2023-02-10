import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
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
        private guestApi: GuestApi
    ) {
        super();
    }

    ngOnInit(): void {
        this.createForm();
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

    selectedTipo: number = 0;
    onChangeTipo = (event: any) => {
        this.selectedTipo = event.value
    }

    onSave = () => {
        console.log('command', this.avisoForm)        
        this.guestApi.save(this.avisoForm).subscribe({
            next: (result) => {
                console.log('result', result)
            }
        })
    }

    back = () => {
        this.route.navigate(['avisos'])
    }
}