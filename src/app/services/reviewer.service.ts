import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../interfaces/config";

@Injectable({
    providedIn: "root"
})
export class ReviewerService {
    updateCategoryList = new EventEmitter();

    constructor(private http: HttpClient) {}

    configUrl = "assets/config/config.json";

    getConfig() {
        return this.http.get<Config>(this.configUrl);
    }

    get(url, option) {
        return this.http.get(url, option);
    }

    post(url, body, option) {
        return this.http.post(url, body, option);
    }

    put(url, body, option) {
        return this.http.put(url, body, option);
    }

    delete(url, option) {
        return this.http.delete(url, option);
    }
}
