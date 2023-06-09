import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RequiredValidator, UntypedFormBuilder, Validators } from "@angular/forms";
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

    @Input() data: any;
    @Output() onBack = new EventEmitter();

    tipoAvisos = [
        { id: ENUMS.VISITANTE, name: 'visitante', tipo: 'VISITANTES' },
        { id: ENUMS.AVISO_RECADO, name: 'aviso', tipo: 'AVISOS / RECADOS' },
        { id: ENUMS.ANIVERSARIO, name: 'aniversario', tipo: 'ANIVERSÁRIO' },
        { id: ENUMS.ORACAO, name: 'oracao', tipo: 'PEDIDO DE ORAÇÃO' },
        { id: ENUMS.APRESENTACAO, name: 'apresentacao', tipo: 'APRESENTAÇÃO CRIANÇA' }
    ]

    camposObrigatorios:{ [key: string]: string[] } = {
        visitante: ["visitante", "frenquentaIgreja"],
        aniversario: ["tipoAniversário", "idade", "aniversariante"],
        apresentacao: ["crianca", "pais"]
    }

    constructor(
        private fb: UntypedFormBuilder,
        private route: Router,
        private guestApi: GuestApi,
        private messageService: MessageService
    ) {
        super();
    }

    title: string = 'Cadastre um novo aviso!'
    ngOnInit(): void {
        this.createForm();
        if (this.data) {
            this.editAviso();
        }
    }

    createForm = () => {
        this.form = this.fb.group({
            tipo: ['', [Validators.required]],
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
        this.title = 'Edição de aviso';
        this.avisoForm = new AvisoCommand(this.data);
        this.selectedTipo = this.avisoForm.guestType;
    }

    selectedTipo: number = 0;
    onChangeTipo = (event: any) => {
        this.avisoForm = new AvisoCommand();
        
        if (this.data)
            this.avisoForm.id = this.data.id;

        this.selectedTipo = event.value;
        this.avisoForm.guestType = this.selectedTipo;
        this.updateValidators(this.camposObrigatorios[this.tipoAvisos.find((x: any) => x.id === event.value)?.name ?? ''] ?? [])
    }

    laoding: boolean[] = [false];
    onSave = () => {
        this.laoding[0] = true;
        this.guestApi.save(this.avisoForm).subscribe({
            next: (result) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Salvo com sucesso!',
                    detail: 'Redirecionando Página!',
                    life: 3000
                })
            }, complete: () => {
                this.laoding[0] = false;
                this.onBack.emit();
            }
        })
    }

    backGrid = (emitCall: any) => {
        this.avisoForm = new AvisoCommand();
        this.onBack.emit({});
    }
}