import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  opened: boolean = true;

  events: string[] = [];

  title = 'Blockcore Market';
}
