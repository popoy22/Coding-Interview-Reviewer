import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ReviewerService } from "../services/reviewer.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
    buttonLabel: String = "SIGN IN";
    res: any;

    constructor(
        private router: Router,
        private reviewerService: ReviewerService,
        public toastController: ToastController
    ) {}

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    ngOnInit() {}

    gethttpOptions() {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token")
            })
        };
    }

    onSubmit(f: NgForm) {
        this.buttonLabel = "SIGNING IN...";
        var obj = {
            email: f.value.name,
            password: f.value.password
        };
        this.reviewerService.getConfig().subscribe(data => {
            var urlLogin = data.apiURL + "login";
            this.reviewerService
                .post(urlLogin, obj, this.gethttpOptions())
                .subscribe((user: any) => {
                    if (user.access_token) {
                        localStorage.setItem("access_token", user.access_token);
                        this.router.navigate([""]);
                    } else {
                        this.presentToast("Invalid Credentials");
                    }
                    this.buttonLabel = "SIGN IN";
                }),
                error => {
                    this.presentToast("Invalid Credentials");
                    this.buttonLabel = "SIGN IN";
                };
        });
    }
}
