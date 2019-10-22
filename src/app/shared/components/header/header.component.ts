import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbDialogService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interface';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  usuario: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';
  public i = 0;
  public ehMedico = false;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private dialogService: NbDialogService,
    private storageService: LocalStorageService,
    public router: Router) {
  }

  ngOnInit() {
    this.usuario = this.storageService.getJson('login');
    this.ehMedico = this.usuario.ehMedico;
    this.storageService.changes.subscribe(val => {
      if (val.key === 'login') {
        this.usuario = val.value;
      }
    });
  }

  get user(): Usuario {
    return this.usuario;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  close() {
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Você realmente deseja sair?' }).onClose.subscribe(response => {
        if (response) {
          this.router.navigateByUrl('/auth/login');
          this.storageService.remove('login');
          this.storageService.remove('token');
        }
      });

  }

  getPerfis() {
    const ret = [];
    if (this.user.ehAdministrador) {ret.push('Administrador'); }
    if (this.user.ehMedico) {ret.push('Médico'); }
    if (this.user.ehFinanceiro) {ret.push('Financeiro'); }
    if (this.user.ehRecepcionista) {ret.push('Recepcionista'); }
    return ret.map(e => ` ${e}`).join();
  }

  onStorageChange(ev: KeyboardEvent) {
    // do something meaningful with it
    console.log(`Localstorage change/updated!`, ev);
  }
}
