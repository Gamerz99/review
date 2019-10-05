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
  category = {
    name: null,
    description: null
  }
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  loading = false;

  constructor(private toastrService: NbToastrService, private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramerMap => {
      const id = paramerMap.get('id');
      this.getcategory(id);
    });
  }

  getcategory(id) {
    if (id === '0') {
      this._id = null;
      this.category = {
        name: null,
        description: null
      };
    } else {
      this.loading = true;
      this.api.getcategoryid(id).subscribe(res => {
        this._id = res.data._id;
        this.category.name = res.data.name;
        this.category.description = res.data.description;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.showToast("danger", "Fail", err.error.message);
      });
    }
  }

  add(category) {
    if (this._id) {
      if (!category.name) {
        this.showToast("warning", "Message", "Please fill all fields");
      } else {
        this.loading = true;
        this.api.updatecategory(this._id, category).subscribe(
          res => {
            this.router.navigate(['pages/category/report']);
          },
          err => {
            this.loading = false;
            this.showToast("danger", "Fail", err.error.message);
          }
        );
      }
    } else {
      if (!category.name) {
        this.showToast("warning", "Message", "Please fill all fields");
      } else {
        this.loading = true;
        this.api.addcategory(category).subscribe(
          res => {
            this.router.navigate(['pages/category/report']);
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
