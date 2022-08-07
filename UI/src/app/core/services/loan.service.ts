import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoanService {
  // private loanSubject: BehaviorSubject<any>;
  // public loan: Observable<any>;
  constructor(private http: HttpClient) {
    // this.loanSubject= new BehaviorSubject({});
    // this.loan = this.loanSubject.asObservable();
  }

  public addloan(payload: any): Observable<any> {
    return this.http.post('https://localhost:5001/loans', payload).pipe(
      map((loanResponse: any) => {
        return loanResponse;
      })
    );
  }
  public getloans(): Observable<any> {
    return this.http.get('https://localhost:5001/loans').pipe(
      map((loanResponse: any) => {
        return loanResponse;
      })
    );
  }
  public modifyloan(payload: any): Observable<any> {
    return this.http
      .patch(`https://localhost:5001/loan/${payload.loanNumber}`, payload)
      .pipe(
        map((loanResponse: any) => {
          return loanResponse;
        })
      );
  }
  public searchLoan(searchFilters: any): Observable<any> {
    let queryParams = new HttpParams();
    for (const key in searchFilters) {
      if (
        searchFilters[key] != null &&
        searchFilters[key] != undefined &&
        searchFilters[key] != ''
      )
        queryParams = queryParams.append(key, searchFilters[key]);
    }

    queryParams = queryParams.append('pageNumber', 1).append('pageSize', 1000);

    return this.http
      .get(`https://localhost:5001/searchloans`, { params: queryParams })
      .pipe(
        map((loanResponse: any) => {
          console.log(loanResponse);
          return loanResponse;
        })
      );
  }
  // public get loanValue(): any {
  //     return this.loanSubject.value;
  // }
}
