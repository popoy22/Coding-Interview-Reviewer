import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReviewerService } from "../services/reviewer.service";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
    selector: "app-add-reviewer",
    templateUrl: "./add-reviewer.page.html",
    styleUrls: ["./add-reviewer.page.scss"]
})
export class AddReviewerPage implements OnInit {
    id: String;
    rid: String;
    title: String;
    content: String;
    reviewer: any;
    navTitle: String;
    submitting: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private reviewerService: ReviewerService,
        private router: Router,
        public toastController: ToastController
    ) {}

    gethttpOptions() {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token")
            })
        };
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        this.reviewerService.updateCategoryList.emit("changed");
        toast.present();
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get("id");
        this.rid = this.activatedRoute.snapshot.paramMap.get("rid");
        if (this.rid) {
            this.navTitle = "Edit Reviewer";
            this.loadReviewer();
        } else {
            this.navTitle = "Add Reviewer";
        }
    }

    add() {
        if (!this.title || this.title == "") {
            this.presentToast("Title Required");
        } else if (!this.content || this.content == "") {
            this.presentToast("Content Required");
        } else {
            this.save();
        }
    }

    loadReviewer() {
        this.rid = this.activatedRoute.snapshot.paramMap.get("rid");
        this.reviewerService.getConfig().subscribe(data => {
            var urlReviewers = data.apiURL + "reviewers/" + this.rid;
            this.reviewerService
                .get(urlReviewers, this.gethttpOptions())
                .subscribe(reviewer => {
                    this.reviewer = reviewer;
                    this.title = this.reviewer.data.title;
                    this.content = this.reviewer.data.description;
                });
        });
    }

    navigate(location: String) {
        this.router.navigate([location]);
    }

    save() {
        this.submitting = true;
        this.reviewerService.getConfig().subscribe(data => {
            var urlReviewers = data.apiURL + "reviewers";
            var obj: any;

            if (this.rid) {
                obj = {
                    title: this.title,
                    description: this.content
                };
                this.reviewerService
                    .put(
                        urlReviewers + "/" + this.rid,
                        obj,
                        this.gethttpOptions()
                    )
                    .subscribe(reviewer => {
                        this.reviewer = reviewer;
                        this.submitting = false;
                        this.presentToast("Saved");
                    });
            } else {
                obj = {
                    title: this.title,
                    description: this.content,
                    category_id: this.id
                };
                this.reviewerService
                    .post(urlReviewers, obj, this.gethttpOptions())
                    .subscribe(reviewer => {
                        this.reviewer = reviewer;
                        this.submitting = false;
                        this.presentToast("Saved");
                    });
            }
        });
    }
}
