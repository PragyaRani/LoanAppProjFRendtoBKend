import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('_USERDATA') || '{}') // null if the localStorage key not rexist
    );
    this.user = this.userSubject.asObservable();
  }
  public login(payload: any): Observable<any> {
    return this.http.post('https://localhost:5001/login', payload).pipe(
      map((loginResponse: any) => {
        localStorage.setItem(
          '_USERDATA',
          JSON.stringify(loginResponse['data'])
        );
        this.userSubject.next(loginResponse['data']);
        return loginResponse;
      })
    );
  }
  public logout(): void {
    // remove user from local storage and set userSubject to null
    localStorage.removeItem('_USERDATA');
    this.userSubject.next(null);
  }
  public get userValue(): any {
    return this.userSubject?.value;
  }
}
