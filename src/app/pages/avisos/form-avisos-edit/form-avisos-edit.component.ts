import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseForm } from "src/app/components/base-form/base-form.component";
import { AvisoCommand } from "src/app/core/api/avisos/command/avisos.command";
import { GuestApi } from "src/app/core/api/avisos/guest-api.controller";
import { ENUMS } from "src/app/core/enum";


@Component({
    selector: 'app-form-avisos',
    templateUrl: './form-avisos-edit.component.html'
})
export class FormAvisosEditComponent extends BaseForm implements OnInit {

    avisoForm: AvisoCommand = new AvisoCommand();
    styleClass: string = '';
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
        private guestApi: GuestApi
    ) {
        super();

        let statePage = this.route.getCurrentNavigation()?.extras.state;
        this.formEdit = statePage?.['data'] ?? null;
        console.log('this', this.formEdit)
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
        console.log('avisoForm', this.avisoForm);
        this.onChangeTipo(this.avisoForm.guestType)
    }

    selectedTipo: number = 0;
    onChangeTipo = (guestType: number) => {
        this.selectedTipo = guestType;
        this.styleClass = 'style-custom-aniversario';
    }

    onSave = () => {
        console.log('command', this.avisoForm)        
        /*this.guestApi.save(this.avisoForm.id, this.avisoForm).subscribe({
            next: (result) => {
                console.log('result', result)
                this.back()
            }
        })*/
    }

    back = () => {
        this.route.navigate(['avisos'])
    }
}