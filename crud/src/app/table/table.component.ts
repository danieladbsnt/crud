import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
//import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() formValues!: User[];

public users: User[] = [
  {
    username: 'aaa',
    password: 'aaa',
    confirmPass: 'aaa',
    email: 'aaa@mail.com',
    subscribed: false,
    country: 'rumania',
    city: 'medias',
    id:1
  },
  {
    username: 'bbb',
    password: 'aaa',
    confirmPass: 'aaa',
    email: 'bbb@mail.com',
    subscribed: false,
    country: 'austria',
    city: 'viena',
    id: 2
  }
];

  constructor() { 
    console.log(this.formValues);
    
  }

edit() {
  console.log('editando');
  
}

delete() {
  console.log( 'borrando');

}

}
