import { Injectable } from '@angular/core';
import { EncryptionService } from '../crypt/encryption.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor(private cript: EncryptionService) {}

  public saveData = (key: string, value: string) => {
    const cKey = this.cript.encrypt(key);
    const cValue = this.cript.encrypt(value);
    localStorage.setItem(cKey, cValue);
  };

  public getData = (key: string) => {
    const cKey = this.cript.encrypt(key);
    const value = localStorage.getItem(cKey);
    return this.cript.decript(value || '');
  };

  public removeData(key: string) {
    const cKey = this.cript.encrypt(key);
    localStorage.removeItem(cKey);
  }
}
