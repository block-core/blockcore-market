import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {}

  baseUrl() {
    return environment.apiUrl;
  }

  async challenge() {
    const response = await fetch(`${environment.apiUrl}/authenticate`);

    if (response.status >= 400) {
      throw new Error('Unable to receive authentication challenge.');
    }

    const result = await response.json();
    return result;
  }

  async verify(challenge: string) {
    const response = await fetch(`${environment.apiUrl}/authenticate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challenge),
    });

    if (response.status >= 400) {
      throw new Error('Unable to verify authentication challenge.');
    }

    const result = await response.json();
    return result;

    //   // Provide the proof which will result in jwt being written as HttpOnly cookie.
    //   const postResponse = await fetch(
    //     `${environment.apiUrl}/authenticate`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(challenge),
    //     }
    //   );

    //   if (postResponse.status == 200) {
    //     const content = await postResponse.json();
    //     console.log('CONTENT FROM AUTH CALL:', content);

    // if (response.status >= 400) {
    //   throw new Error('Unable to receive authentication challenge.');
    // }

    // const result = await response.json();
    // return result;
  }
}
