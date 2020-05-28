import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReviewerService } from "../services/reviewer.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
    selector: "app-folder",
    templateUrl: "./folder.page.html",
    styleUrls: ["./folder.page.scss"]
})
export class FolderPage implements OnInit {
    public id: string = "1";
    public reviewers: any;
    public category: any;
    public logged: boolean = false;
    title;

    constructor(
        private activatedRoute: ActivatedRoute,
        private reviewerService: ReviewerService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadReviewers("");
    }

    ionViewDidEnter() {
        this.loadReviewers("");
    }

    gethttpOptions() {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token")
            })
        };
    }

    loadReviewers(title) {
        this.reviewers = null;
        if (this.activatedRoute.snapshot.paramMap.get("id")) {
            this.id = this.activatedRoute.snapshot.paramMap.get("id");
        }

        this.reviewerService.getConfig().subscribe(data => {
            var urlCategory = data.apiURL + "categories";
            urlCategory = urlCategory + "/" + this.id;
            this.reviewerService
                .get(urlCategory, this.gethttpOptions())
                .subscribe(category => {
                    this.category = category;
                });

            var urlReviewers = data.apiURL + "reviewers";
            urlReviewers = urlReviewers + "?category=" + this.id;

            if (title != "") {
                urlReviewers = urlReviewers + "&title=" + title;
            }

            this.reviewerService
                .get(urlReviewers, this.gethttpOptions())
                .subscribe(reviewers => {
                    this.reviewers = reviewers;
                });

            if (localStorage.getItem("access_token")) {
                var urlUser = data.apiURL + "user";
                this.reviewerService
                    .get(urlUser, this.gethttpOptions())
                    .subscribe(
                        user => {
                            this.logged = true;
                        },
                        error => {
                            this.logged = false;
                        }
                    );
            }
        });
    }
    keyDown($e) {
        if ($e.length >= 3 || $e.length == 0) {
            this.reviewers = null;
            this.loadReviewers($e);
        }
    }

    returnZero() {
        return 0;
    }

    logout() {
        localStorage.clear();
        this.logged = false;
    }

    // Scrolling
}
