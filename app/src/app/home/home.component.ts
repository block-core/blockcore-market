import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  constructor() {}

  async ngOnInit() {
    const nodeEndpoint = 'http://localhost:5050/api';
    const collectionUrl = 'category/root';
    const response = await fetch(`${nodeEndpoint}/${collectionUrl}`);

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    console.log(result);
    this.categories = result;
  }
}
