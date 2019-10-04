import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: null,
    password: null
  }
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  loading = false;

  constructor(private toastrService: NbToastrService, private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login(user) {
    if (!user.email || !user.password) {
      this.showToast("warning", "Message", "Please fill all fields");
    } else {
      this.loading = true;
      this.api.login(user).subscribe(
        res => {
          localStorage.setItem('session_data', JSON.stringify(res.userdata));
          this.router.navigate(['pages/dashboard']);
        },
        err => {
          this.loading = false;
          this.showToast("danger", "Fail", "Invalid credentials");
        }
      );
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
