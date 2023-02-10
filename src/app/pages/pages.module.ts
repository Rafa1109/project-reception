import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MessageService } from "primeng/api";
import { ComponentsModule } from "../components/components.module";
import { PrimeNGModules } from "../core/modules/primeng.module";
import { AutenticacaoComponent } from "./autenticacao/autenticacao.component";
import { AvisosComponent } from "./avisos/avisos.component";
import { FormAvisosComponent } from "./avisos/form-avisos/form-avisos.component";

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
    }
]

@NgModule({
    declarations: [
        AvisosComponent,
        AutenticacaoComponent,
        FormAvisosComponent
    ],
    imports: [
        PrimeNGModules,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    providers: [MessageService]
})
export class PagesModule { }