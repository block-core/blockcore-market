import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent implements OnInit {
  collections: any[] = [];

  private map: any;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.map = L.map('map', {
      attributionControl: true,

      center: [58.358786, 7.547088],
      zoom: 16,

      minZoom: 10,
      maxZoom: 22,
      // maxBounds: [
      //   [58.3, 7.6],
      //   [58.4, 7.5],
      // ],
    });

    // initialize the map on the "map" div with a given center and zoom
    // this.map = L.map('map', {
    //   center: [51.505, -0.09],
    //   zoom: 13,
    // });

    this.map.attributionControl.setPrefix('');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.collections = await this.apiService.categories();

    // const rawResponse = await fetch(serviceUrl, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: jws,
    // });

    // Due to rendering issue on smaller screens / mobile devices, we do this extra refresh here.
    // No longer needed due to fix for grid layout (overflow on content, making 100% height staying stable).
    // Left as a future example on invalidation if needed.
    //this.map.invalidateSize(false);
    // this.map.setView([58.35877, 7.54705], 19);
  }
}
