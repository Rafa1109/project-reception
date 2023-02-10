import { NgModule } from "@angular/core";
import { PrimeNGModules } from "../core/modules/primeng.module";
import { BaseContentComponent } from "./base-content/base-content.component";
import { NavBarComponent } from "./navbar/navbar.component";

@NgModule({
    declarations: [
        NavBarComponent,
        BaseContentComponent
    ],
    imports: [
        PrimeNGModules
    ],
    exports: [
        NavBarComponent,
        BaseContentComponent
    ]
})
export class ComponentsModule {}