import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GuestApi {
    _baseUrl: string = `${environment.api}/guest`;

    constructor(private http: HttpClient) {}

    login(loginCommand: any): Observable<any> {
        return this.http.post<any>(`${this._baseUrl}/auth/login`, loginCommand);
    }

    createJUser(command: any): Observable<any> {
        return this.http.post<any>(`${this._baseUrl}/user/create`, command);
    }

    findAll(): Observable<any> {
        return this.http.get<any>(`${this._baseUrl}/find`);
    }

    private edit(id: string, command: any): Observable<any> {
        return this.http.put<any>(`${this._baseUrl}/edit/${id}`, command);
    }

    private create(command: any): Observable<any> {
        return this.http.post<any>(`${this._baseUrl}/save`, command);
    }

    save(command: any): Observable<any> {
        return command.id == null ? this.create(command) : this.edit(command.id, command);
    }
    
    findById(id: string): Observable<any> {
        return this.http.get<any>(`${this._baseUrl}/find/${id}`);
    }

    announced(id: string): Observable<any> {
        return this.http.put<any>(`${this._baseUrl}/announced/${id}`, null)
    }
}