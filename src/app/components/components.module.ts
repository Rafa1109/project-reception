import { NgModule } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { PrimeNGModules } from "../core/modules/primeng.module";
import { BaseContentComponent } from "./base-content/base-content.component";
import { LogoComponent } from "./logo/logo.component";
import { ModalViewComponent } from "./modais/view/view.component";
import { NavBarComponent } from "./navbar/navbar.component";

@NgModule({
    declarations: [
        NavBarComponent,
        ModalViewComponent,
        BaseContentComponent,
        LogoComponent
    ],
    imports: [
        PrimeNGModules,
        DialogModule,
    ],
    exports: [
        NavBarComponent,
        BaseContentComponent,
        ModalViewComponent,
        LogoComponent
    ]
})
export class ComponentsModule { }