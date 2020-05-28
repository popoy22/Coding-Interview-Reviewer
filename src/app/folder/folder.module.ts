import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FolderPageRoutingModule } from "./folder-routing.module";
import { ScrollVanishDirective } from "./../directives/scroll-vanish.directive";
import { FolderPage } from "./folder.page";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, FolderPageRoutingModule],
    declarations: [FolderPage, ScrollVanishDirective]
})
export class FolderPageModule {}
