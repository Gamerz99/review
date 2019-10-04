import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://review1.herokuapp.com';

  constructor(private http: HttpClient) { }

  searchbytitle(title) {
    return this.http.get<any>(this.url + '/game/search/' + title);
  }

  getgamebytitle(title) {
    return this.http.get<any>(this.url + '/game/title/' + title);
  }

  getgames() {
    return this.http.get<any>(this.url + '/game');
  }

  gettrendinggames() {
    return this.http.get<any>(this.url + '/game/trending');
  }

  gettopgames() {
    return this.http.get<any>(this.url + '/game/top');
  }

  getsuggestiongames() {
    return this.http.get<any>(this.url + '/game/suggestion');
  }

}
