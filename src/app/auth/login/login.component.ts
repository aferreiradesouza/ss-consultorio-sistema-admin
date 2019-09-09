import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor() {
  }

  login(): void {
      console.log('login')
  }
}
