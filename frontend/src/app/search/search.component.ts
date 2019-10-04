import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  rescount = 0;
  games: any = null;
  loading = false;
  alert = false;
  message = "Server Problem"

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramerMap => {
      const title = paramerMap.get('title');
      if (title) {
        this.getgames(title);
      }
    });
  }

  getgames(title) {
    this.games = null;
    this.alert = false;
    this.loading = true;
    this.api.searchbytitle(title).subscribe(
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
