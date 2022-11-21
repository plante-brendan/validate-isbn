import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationResult } from './validationResult';

@Injectable({providedIn: 'root'})
export class ValidationService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient){}

  /**
   * This method calls the backend service and returns the result for a 10 digit ISBN
   * @param rawISBN 
   * @returns 
   */
  public validateTenDigitISBN(rawISBN: string): Observable<ValidationResult> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("rawISBN", rawISBN);
    return this.http.get<ValidationResult>(`${this.apiServerUrl}/validate/tendigit`, {params:queryParams});
  }

  /**
   * This method calls the backend service and returns the result for a 13 digit ISBN
   * @param rawISBN 
   * @returns 
   */
  public validateThirteenDigitISBN(rawISBN: string): Observable<ValidationResult> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("rawISBN", rawISBN);
    return this.http.get<ValidationResult>(`${this.apiServerUrl}/validate/thirteendigit`, {params:queryParams});
  }
}