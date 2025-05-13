import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/v1';

  signin(signinRequest: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/sign-in`,
      signinRequest,
    );
  }


}
