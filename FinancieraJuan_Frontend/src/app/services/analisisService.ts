import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalisisService {
  private apiUrl = 'https://financierajuan_backend.railway.app';

  constructor(private http: HttpClient) {}

  calcular(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
