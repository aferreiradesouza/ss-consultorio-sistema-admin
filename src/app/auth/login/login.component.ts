import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });
  constructor() {
  }

  login(): void {
  }
}
