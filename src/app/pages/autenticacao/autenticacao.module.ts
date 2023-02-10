import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { ComponentsModule } from "src/app/components/components.module";
import { PrimeNGModules } from "src/app/core/modules/primeng.module";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: "login",
        component: LoginComponent
    }
]

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        ComponentsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PrimeNGModules,
        RouterModule.forChild(routes),
    ],
})
export class AutenticacaoModule { }