import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.categories = await this.apiService.categories();
  }
}
