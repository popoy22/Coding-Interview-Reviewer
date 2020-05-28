import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { QuillModule } from "ngx-quill";

import { AddReviewerPageRoutingModule } from "./add-reviewer-routing.module";

import { AddReviewerPage } from "./add-reviewer.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuillModule.forRoot({
            modules: {
                syntax: true,
                toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "bullet" }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ align: [] }],
                    ["code-block"]
                ]
            }
        }),
        AddReviewerPageRoutingModule
    ],
    declarations: [AddReviewerPage]
})
export class AddReviewerPageModule {}
