import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }
  public data: User[] = [];

  public subject = new Subject<User>();
   

}
