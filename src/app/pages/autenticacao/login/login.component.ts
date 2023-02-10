import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { BaseForm } from "src/app/components/base-form/base-form.component";
import { LoginCommand } from "src/app/core/api/avisos/command/login.command";
import { FormValidatorHelper } from "src/app/core/helpers/form-validation";
import { AuthService } from "src/app/core/services/authentications/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends BaseForm implements OnInit {

    loginCommand: LoginCommand = new LoginCommand();

    constructor(
        private fb: UntypedFormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private route: Router
    ) {
        super();

        this.validationMessages = {
            login: { required: 'Campo Obrigatório' },
            senha: { required: 'Campo Obrigatório' }
        }

        this.formValidator = new FormValidatorHelper(this.validationMessages);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            login: ['', [Validators.required]],
            senha: ['', [Validators.required]]
        });
    }

    passwordView: boolean = false;
    onPasswordView() {
        this.passwordView = !this.passwordView;
    }

    onBlur(input: string) {
        this.checkValidity(input);
    }

    loading: boolean[] = [false];
    login = () => {
        this.loading[0] = true;
        this.authService.login(this.loginCommand.login ?? "", this.loginCommand.password ?? "").subscribe({
            next: (result) => {
                console.log('result login', result)
                this.messageService.add({
                    severity: 'success',
                    summary: 'Login Realizado com sucesso',
                    detail: 'Redirecionando página',
                    life: 3000
                })
            }, complete: () => {
                this.route.navigate([`avisos`]);
            }
        })    
    }

}