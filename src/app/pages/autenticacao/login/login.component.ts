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
                this.messageService.add({
                    severity: 'success',
                    summary: 'Autenticado',
                    detail: 'Redirecionando página!',
                    life: 3000,
                  });
            }, error: (e) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao realizar login',
                    detail: 'Usuário ou senha inválidos',
                    life: 3000
                })
                this.loading[0] = false;
            },
            complete: () => {
                this.loading[0] = false
                this.route.navigate([`avisos`]);
            }
        }) 
    }

}