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
  user = {
    name: null,
    email: null,
    password: null
  }
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  loading = false;

  constructor(private toastrService: NbToastrService, private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramerMap => {
      const id = paramerMap.get('id');
      this.getuser(id);
    });
  }

  getuser(id) {
    if (id === '0') {
      this._id = null;
      this.user = {
        name: null,
        email: null,
        password: null
      };
    } else {
      this.api.getuserid(id).subscribe(res => {
        this.user.password = "1111";
        this._id = res.data._id;
        this.user.email = res.data.email;
        this.user.name = res.data.name;
      });
    }
  }

  add(user) {
    if (this._id) {
      if (!user.email || !user.email) {
        this.showToast("warning", "Message", "Please fill all fields");
      } else {
        this.loading = true;
        this.api.updateuser(this._id, user).subscribe(
          res => {
            this.router.navigate(['pages/user/report']);
          },
          err => {
            this.loading = false;
            this.showToast("danger", "Fail", err.error.message);
          }
        );
      }
    } else {
      if (!user.email || !user.email || !user.password) {
        this.showToast("warning", "Message", "Please fill all fields");
      } else {
        this.loading = true;
        this.api.adduser(user).subscribe(
          res => {
            this.router.navigate(['pages/user/report']);
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
