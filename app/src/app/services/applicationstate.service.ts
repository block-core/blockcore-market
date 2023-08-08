import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationState {
  identity: any;

  short: any;

  authenticated: boolean = false;

  admin = false;
}
