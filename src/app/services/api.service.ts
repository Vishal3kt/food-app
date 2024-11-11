import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:3001/api/v1';

  constructor(private http: HttpClient) { }

  adminSignup(formData: { "firstName": string, "lastName": string, "email": string, "password": string, "dob": number, "phoneNumber": number }) {
    return this.http.post(`${this.baseUrl}/adminRegister`, formData);
  }

  adminSignin(formData: { "email": string, password: string }) {
    return this.http.post(`${this.baseUrl}/adminLogin`, formData)
  }

  adminChangePassword(formData: { "password": string }) {
    return this.http.post(`${this.baseUrl}/adminPassword/update`, formData);
  }

  adminForgotPassword(formData: { "email": string, "password": string }) {
    return this.http.post(`${this.baseUrl}/adminForgotPassword`, formData);
  }

  logoutAdmin() {
    return this.http.get(`${this.baseUrl}/adminLogout`);
  }

  addUser(formData: { "firstName": string, "lastName": string, "email": string, "password": string, "role": string, "phoneNumber": number, "dateOfBirth": number, "address": string, "shortAddress": string, "pinCode": number, "zone": string, "googleMapURL": string, "rate": string, "amountPaidOnCurrentMonth": number, "currentBalance": number, "allPayments": string }) {
    return this.http
  }

}
