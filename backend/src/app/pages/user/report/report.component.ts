import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
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
        title: 'User Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private toastrService: NbToastrService, private api: ApiService, private router: Router) {

  }

  ngOnInit() {
    this.loaduser()
  }

  loaduser() {
    this.api.getusers().subscribe(
      res => {
        this.source.load(res.data);
      },
      err => {
        this.showToast("danger", "Fail", err.error.message);
      }
    );
  }

  onDelete(event): void {

    this.api.deleteuser(event.data._id).subscribe(
      res => {
        this.loaduser()
        this.showToast("success", "Message", "Delete successful");
      },
      err => {
        this.showToast("danger", "Fail", err.error.message);
      }
    );
  }

  onEdit(event): void {
    this.router.navigate(['pages/user/add_user', event.data._id]);
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
