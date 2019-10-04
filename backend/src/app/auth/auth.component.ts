import { Component } from '@angular/core';

@Component({
  selector: 'ngx-form-elements',
  styleUrls: ['auth.component.scss'],
  template: `
  <nb-layout>
  <nb-layout-column>
  <router-outlet></router-outlet>
  </nb-layout-column>
  </nb-layout>
  `,
})
export class AuthComponent {
}
