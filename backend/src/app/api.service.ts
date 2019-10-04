import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  adduser(data) {
    return this.http.post<any>(this.url + '/user', data);
  }

  getusers() {
    return this.http.get<any>(this.url + '/user');
  }

  getuserid(id) {
    return this.http.get<any>(this.url + '/user/' + id);
  }

  deleteuser(id) {
    return this.http.delete<any>(this.url + '/user/' + id);
  }

  updateuser(id, data) {
    return this.http.put<any>(this.url + '/user/' + id, data);
  }

  login(data) {
    return this.http.post<any>(this.url + '/user/login', data);
  }

  loggedin() {
    return !!localStorage.getItem('session_data');
  }

  getuserdata() {
    return localStorage.getItem('session_data');
  }

  logout() {
    if (localStorage.getItem('session_data')) {
      localStorage.removeItem('session_data');
    }
  }



}
