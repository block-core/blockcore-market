import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: 'collection.component.html',
})
export class CollectionComponent implements OnInit {
  collections: any[] = [];

  constructor() {}

  async ngOnInit() {
    const nodeEndpoint = 'http://localhost:5050/api';
    const collectionUrl = 'collection';
    const response = await fetch(`${nodeEndpoint}/${collectionUrl}`);

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    console.log(result);
    this.collections = result;

    // const rawResponse = await fetch(serviceUrl, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: jws,
    // });
  }
}
