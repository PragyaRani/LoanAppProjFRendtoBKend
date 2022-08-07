import { Component, Input, OnInit } from '@angular/core';
const CLASS_PREFIX =
  'col-12-xs col-12-sm col-12-md col-12-lg col-12-xl p-1 text-white';

@Component({
  selector: 'message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.css'],
})
export class MessageAlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() messages: string[] = [];
  @Input() type: string = 'INFO';
  @Input() show: boolean = false;
  classPrefix = CLASS_PREFIX;

  constructor() {}

  ngOnInit(): void {}

  getAlertClass(type: string = 'INFO'): string {
    switch (type) {
      case 'INFO':
        return 'bg-info';
      case 'DANGER':
      case 'ERROR':
        return 'bg-danger';
      case 'WARNING':
        return 'bg-warning';
      case 'SUCCESS':
        return 'bg-success';
      default:
        return 'ng-info';
    }
  }
}
