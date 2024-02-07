import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:3000/api/v1/auth'; // Update with your API URL

  constructor(private http: HttpClient) {}

  async login(formData: FormData): Promise<any> {
    try {
      const resultData = await this.http.post(`${this.apiUrl}/login`, formData).toPromise();
      return resultData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  
}
