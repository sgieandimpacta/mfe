import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, CompanyRequest } from '../shared/models/Company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3333/companys';

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Array<Company>>(this.url);
  }

  public getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.url}/${id}`);
  }

  public addCompany(company: CompanyRequest): Observable<any> {
    return this.http.post(this.url, company);
  }

  public updateCompany(id: string, company: CompanyRequest): Observable<any> {
    return this.http.put(`${this.url}/${id}`, company);
  }

  public removeCompany(id: String): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
