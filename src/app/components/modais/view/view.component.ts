import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AvisoCommand } from "src/app/core/api/avisos/command/avisos.command";

@Component({
    selector: 'app-modal-view',
    templateUrl: './view.component.html'
})
export class ModalViewComponent implements OnInit {
    constructor() { }

    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() form: AvisoCommand = new AvisoCommand();
    @Input() labelPrimaryButton: string = '';

    @Output() onPrimaryClick = new EventEmitter();

    ngOnInit(): void {
    }

    displayModal = false;

    openModal = () => (this.displayModal = true);

    closeModal = () => (this.displayModal = false);

    primaryClick = () => {
        this.closeModal();
        this.onPrimaryClick.emit();
    }

    tratarValueType = (form: AvisoCommand) => {
        let completeDesc = ''
        if (form.guestType == 3)
            completeDesc = form.person.birthday.type === 2 ? ' DE VIDA' : ' DE CASAMENTO';

        return form.guestTypeDesc + completeDesc;
    }
}