import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadServiceService {

  private url: string = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) { }

  postLead(data: any){
    return this.httpClient.post(`${this.url}/api/lead`, data);
  }

  getPublicAddress(){
    return this.httpClient.get('https://api.ipify.org/?format=json');
  }

  getLead(){
    return this.httpClient.get(`${this.url}/api/lead`);
  }
}
