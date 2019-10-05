import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ApiService } from '../../../api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  _id = null
  user: any;
  game = {
    title: null,
    description: null,
    image: null,
    price: null,
    company: null,
    category: "null",
    rating: null,
    downloads: null,
    age: null,
    url: {
      android: null,
      apple: null
    },
    trending: null,
    top: null,
    suggestion: null,
    user: null
  }
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  loading = false;

  constructor(private toastrService: NbToastrService, private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramerMap => {
      const id = paramerMap.get('id');
      this.getgame(id);
    });
    this.user = JSON.parse(this.api.getuserdata());
    this.game.user = this.user.name;
  }

  getgame(id) {
    if (id === '0') {
      this._id = null;
      this.game = {
        title: null,
        description: null,
        image: null,
        price: null,
        company: null,
        category: "null",
        rating: null,
        downloads: null,
        age: null,
        url: {
          android: null,
          apple: null
        },
        trending: false,
        top: false,
        suggestion: false,
        user: null
      };
    } else {
      this.loading = true;
      this.api.getgameid(id).subscribe(res => {
        this._id = res.data._id;
        this.game.title = res.data.title;
        this.game.description = res.data.description;
        this.game.image = res.data.image;
        this.game.price = res.data.price;
        this.game.company = res.data.company;
        this.game.category = res.data.category;
        this.game.rating = res.data.rating;
        this.game.downloads = res.data.downloads;
        this.game.age = res.data.age;
        this.game.url.android = res.data.url.android;
        this.game.url.apple = res.data.url.apple;
        this.game.trending = res.data.trending;
        this.game.top = res.data.top;
        this.game.suggestion = res.data.suggestion;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.showToast("danger", "Fail", err.error.message);
      });
    }
  }

  add(game) {
    console.log(game)
    if (this._id) {
      if (!game.title || !game.description || !game.image || !game.price || !game.company || game.category == "null" || !game.rating || !game.downloads || !game.age || !game.url.android || !game.url.apple) {
        this.showToast("warning", "Message", "Please fill all fields");
      } else {
        this.loading = true;
        this.api.updategame(this._id, game).subscribe(
          res => {
            this.router.navigate(['pages/game/report']);
          },
          err => {
            this.loading = false;
            this.showToast("danger", "Fail", err.error.message);
          }
        );
      }
    } else {
      if (!game.title || !game.description || !game.image || !game.price || !game.company || game.category == "null" || !game.rating || !game.downloads || !game.age || !game.url.android || !game.url.apple) {
        this.showToast("warning", "Message", "Please fill all fields");
      } else {
        this.loading = true;
        this.api.addgame(game).subscribe(
          res => {
            this.router.navigate(['pages/game/report']);
          },
          err => {
            this.loading = false;
            this.showToast("danger", "Fail", err.error.message);
          }
        );
      }
    }
  }


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: this.position,
      preventDuplicates: true,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Toast ${this.index}${titleContent}`,
      config);
  }


}
