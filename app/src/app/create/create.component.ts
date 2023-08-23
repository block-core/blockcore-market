import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  favoriteSeason?: string = 'sell';
  seasons: string[] = ['give', 'buy', 'sell'];
}
