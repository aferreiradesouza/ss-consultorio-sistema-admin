import { Component, OnInit, Input } from '@angular/core';
import { NbCalendarDayCellComponent } from '@nebular/theme';
import { CalendarioData } from '../../../@core/data/calendario';

@Component({
  selector: 'ngx-calendar-custom-day-cell',
  styles: [`
    :host { text-align: center; }
    span { font-size: 75%; opacity: 0.75; }
  `],
  template: `
    <div>
      <div>{{ day }}</div>
      <span>{{ (day + 100) * day }}$</span>
    </div>
  `,
  host: { '(click)': 'onClick()', 'class': 'day-cell' },
})
export class CalendarCustomDayCellComponent extends NbCalendarDayCellComponent<Date> implements OnInit {


    ngOnInit() {
    }
}
