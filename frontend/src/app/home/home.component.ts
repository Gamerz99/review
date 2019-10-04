import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rescount = 0;
  games: any = null;
  loading = false;
  alert = false;
  message = "Server Problem"

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getgames();
  }

  getgames() {
    this.alert = false;
    this.loading = true;
    this.api.getgames().subscribe(
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
