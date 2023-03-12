import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ComponentsModule } from "../components/components.module";
import { PrimeNGModules } from "../core/modules/primeng.module";
import { AutenticacaoComponent } from "./autenticacao/autenticacao.component";
import { AvisosComponent } from "./avisos/avisos.component";
import { FormAvisosComponent } from "./avisos/form-avisos/form-avisos.component";
import {FormAvisosEditComponent} from "./avisos/form-avisos-edit/form-avisos-edit.component";

const routes: Routes = [
    {
        path: '',
        component: AutenticacaoComponent,
        loadChildren: () =>
            import('./autenticacao/autenticacao.module').then(
                (m) => m.AutenticacaoModule
            ),
    },
    {
        path: 'avisos',
        component: AvisosComponent
    },
    {
        path: 'form-aviso',
        component: FormAvisosComponent
    },
    {
        path: 'form-aviso-edit',
        component: FormAvisosEditComponent
    }
]

@NgModule({
    declarations: [
        AvisosComponent,
        AutenticacaoComponent,
        FormAvisosComponent,
        FormAvisosEditComponent
    ],
    imports: [
        PrimeNGModules,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        PrimeNGModules
    ],
    providers: [ConfirmationService, MessageService]
})
export class PagesModule { }