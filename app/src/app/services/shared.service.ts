import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isLoged: EventEmitter<boolean> = new EventEmitter();
  isAdmin: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
