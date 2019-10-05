import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbComponentStatus
} from '@nebular/theme';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  loading = false;

  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      mode: 'inline',
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Category Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private toastrService: NbToastrService, private api: ApiService, private router: Router) {

  }

  ngOnInit() {
    this.loadcategory()
  }

  loadcategory() {
    this.loading = true;
    this.api.getcategory().subscribe(
      res => {
        this.source.load(res.data);
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.showToast("danger", "Fail", err.error.message);
      }
    );
  }

  onDelete(event): void {
    this.loading = true;
    this.api.deletecategory(event.data._id).subscribe(
      res => {
        this.loadcategory()
        this.showToast("success", "Message", "Delete successful");
      },
      err => {
        this.loading = false;
        this.showToast("danger", "Fail", err.error.message);
      }
    );
  }

  onEdit(event): void {
    this.router.navigate(['pages/category/add_category', event.data._id]);
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
