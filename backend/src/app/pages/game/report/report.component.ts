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
      title: {
        title: 'Game Title',
        type: 'string',
      },
      company: {
        title: 'Company',
        type: 'string',
      },
      downloads: {
        title: 'Downloads',
        type: 'string',
      },
      rating: {
        title: 'Rating',
        type: 'number',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
      user: {
        title: 'User',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private toastrService: NbToastrService, private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.loadgame()
  }

  loadgame() {
    this.loading = true;
    this.api.getgame().subscribe(
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
    this.api.deletegame(event.data._id).subscribe(
      res => {
        this.loadgame()
        this.showToast("success", "Message", "Delete successful");
      },
      err => {
        this.loading = false;
        this.showToast("danger", "Fail", err.error.message);
      }
    );
  }

  onEdit(event): void {
    this.router.navigate(['pages/game/add_game', event.data._id]);
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
