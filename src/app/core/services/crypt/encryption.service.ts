import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EncryptionService {
  constructor() {}

  encrypt = (value: string) => {
    const data = JSON.stringify(value);
    return btoa(data);
  };
  
  decript = (value: string) => {
    const data = atob(value);
    return data && JSON.parse(data);
  };
}
