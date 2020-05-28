import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { ReviewerService } from "./services/reviewer.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
    public categories: any;
    public selectedIndex = 0;
    gethttpOptions() {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token")
            })
        };
    }

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private reviewerService: ReviewerService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logged: boolean = false;
    ngOnInit() {
        this.reviewerService.updateCategoryList.subscribe(() => {
            this.loadCategories();
        });
        this.loadCategories();
    }

    loadCategories() {
        this.reviewerService.getConfig().subscribe(data => {
            var url = data.apiURL + "categories";
            this.reviewerService
                .get(url, this.gethttpOptions())
                .subscribe(categories => {
                    this.categories = categories;
                });
        });
    }
    returnZero() {
        return 0;
    }
    logout() {
        localStorage.clear();
    }
    reload() {
        this.loadCategories();
    }
}
