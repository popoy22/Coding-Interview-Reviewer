import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReviewerService } from "../services/reviewer.service";
import { HttpHeaders } from "@angular/common/http";
import { AlertController } from "@ionic/angular";

@Component({
    selector: "app-detail",
    templateUrl: "./detail.page.html",
    styleUrls: ["./detail.page.scss"]
})
export class DetailPage implements OnInit {
    public id: string;
    public cid: string;
    public reviewer: any;
    public logged: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private reviewerService: ReviewerService,
        private alertController: AlertController,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadReviewer();
    }

    gethttpOptions() {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token")
            })
        };
    }

    loadReviewer() {
        this.reviewer = null;
        this.id = this.activatedRoute.snapshot.paramMap.get("id");
        this.reviewerService.getConfig().subscribe(data => {
            var urlReviewers = data.apiURL + "reviewers/" + this.id;
            this.reviewerService
                .get(urlReviewers, this.gethttpOptions())
                .subscribe(reviewer => {
                    this.reviewer = reviewer;
                    this.cid = this.reviewer.data.category_id;
                });
            if (localStorage.getItem("access_token")) {
                var urlUser = data.apiURL + "user";
                this.reviewerService
                    .get(urlUser, this.gethttpOptions())
                    .subscribe(
                        user => {
                            this.logged = true;
                        },
                        error => {}
                    );
            }
        });
    }

    deleteReviewer() {
        this.reviewerService.getConfig().subscribe(data => {
            console.log(this.id);
            var urlReviewers = data.apiURL + "reviewers/" + this.id;
            this.reviewerService
                .delete(urlReviewers, this.gethttpOptions())
                .subscribe(reviewer => {
                    this.reviewerService.updateCategoryList.emit("deleted");
                    this.router.navigate(["/folder/" + this.cid]);
                });
        });
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            cssClass: "my-custom-class",
            header: "Confirm!",
            message: "Are you sure you want to delete this record?",
            mode: "ios",
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                    cssClass: "secondary",
                    handler: blah => {}
                },
                {
                    text: "Okay",
                    handler: () => {
                        this.deleteReviewer();
                    }
                }
            ]
        });
        await alert.present();
    }
}
