import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit {

  game: any = null;
  loading = false;
  alert = false;
  message = "Server Problem"

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramerMap => {
      const title = paramerMap.get('title');
      this.getgame(title);;
    });
  }

  getgame(title) {
    this.alert = false;
    this.loading = true;
    this.api.getgamebytitle(title).subscribe(
      res => {
        this.game = res.data;
        this.loading = false;
      },
      err => {
        this.alert = true;
        this.loading = false;
        console.log(err);
      }
    );
  }


}
