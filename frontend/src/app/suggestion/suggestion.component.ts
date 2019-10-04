import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  rescount = 0;
  games: any = null;
  loading = false;
  alert = false;
  message = "Server Problem"

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getsuggestiongames();
  }

  getsuggestiongames() {
    this.alert = false;
    this.loading = true;
    this.api.getsuggestiongames().subscribe(
      res => {
        this.games = res.data;
        this.rescount = res.data.length;
        this.loading = false;
      },
      err => {
        this.alert = true;
        this.loading = false;
        console.log(err);
      }
    );
  }

  godetail(title) {
    this.router.navigate(['/', title]);
  }

}
