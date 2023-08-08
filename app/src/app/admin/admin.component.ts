import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
})
export class AdminComponent implements OnInit {
  categories: any[] = [];
  collections: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  async loadCategories(type: string) {
    this.categories = await this.apiService.categories();
  }

  async loadCollections(type: string) {
    this.collections = await this.apiService.collections();
  }
}
