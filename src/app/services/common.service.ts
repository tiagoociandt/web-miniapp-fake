import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private retryCount = 2;

  get baseURL(): string {
    return environment.serverURL;
  }

  get httpContentTypeHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private httpOptions = {
    headers: this.httpContentTypeHeader
  };

  private constructor(private http: HttpClient) { }

  public get<T>(route: string): Observable<T> {
    console.log(`request ${this.baseURL + route}`);
    return this.http
    .get<T>(this.baseURL + route, this.httpOptions)
    .pipe(retry(this.retryCount), catchError(this.errorHandler));
  }

  public post<T>(route: string, data: any): Observable<T> {
    return this.http
    .post<T>(this.baseURL + route, JSON.stringify(data), this.httpOptions)
    .pipe(retry(this.retryCount), catchError(this.errorHandler));
  }

  public put<T>(route: string, data: any): Observable<T> {
    return this.http
    .put<T>(this.baseURL + route, JSON.stringify(data), this.httpOptions)
    .pipe(retry(this.retryCount), catchError(this.errorHandler));
  }

  public delete<T>(route: string): Observable<T> {
    return this.http.delete<T>(this.baseURL + route, this.httpOptions)
    .pipe(retry(this.retryCount), catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
