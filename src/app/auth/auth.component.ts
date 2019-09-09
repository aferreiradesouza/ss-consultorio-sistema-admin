import { Component } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
  <nb-layout>
    <nb-layout-column>
      <nb-card>
        <nb-card-body>
          <router-outlet></router-outlet>
        </nb-card-body>
      </nb-card>
    </nb-layout-column>
  </nb-layout>
  `,
})
export class AuthComponent {
  // showcase of how to use the onAuthenticationChange method
  constructor() {
  }

  back() {
    console.log('teste');
    return false;
  }
}
