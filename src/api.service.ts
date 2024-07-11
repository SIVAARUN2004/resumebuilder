import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    private baseUrl = "http://localhost:4000";

    constructor(private httpClient: HttpClient) { }

    registerUser(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/user-register`, userDetails);
    }
    loginUser(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/loginUser`, userDetails);
    }
    loginRecru(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/loginRecru`, userDetails);
    }
}