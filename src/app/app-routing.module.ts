import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadChildren: () =>
            import("./folder/folder.module").then(m => m.FolderPageModule)
    },
    {
        path: "folder/:id",
        loadChildren: () =>
            import("./folder/folder.module").then(m => m.FolderPageModule)
    },
    {
        path: "reviewer/add/:id/:rid",
        loadChildren: () =>
            import("./add-reviewer/add-reviewer.module").then(
                m => m.AddReviewerPageModule
            )
    },
    {
        path: "reviewer/add/:id",
        loadChildren: () =>
            import("./add-reviewer/add-reviewer.module").then(
                m => m.AddReviewerPageModule
            )
    },
    {
        path: "login",
        loadChildren: () =>
            import("./login/login.module").then(m => m.LoginPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
