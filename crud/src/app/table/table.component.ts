import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from '../interfaces/user';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
//@Input() subscribed!: boolean;
@Output() userEdited: EventEmitter<User> = new EventEmitter();

users!: User[];
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getData()
      .subscribe(users => {
        this.users = users;
        console.log(users);
      });
  }
//mandar al form el user que ha sido clickado
update( id: number) {
  let editedUser = this.users.find((user) => user.id === id)
  this.userEdited.emit(editedUser)
}

delete(id: number) {
  let userDeleted = this.users.findIndex((user)=> user.id === id)
  console.log('borrando', userDeleted);
  
  if(userDeleted != -1) {
    this.users.splice(userDeleted, 1)
  }

  this.service.deleteData(id)
    .subscribe(resp => {
      console.log(resp); 
    }) 
}
}