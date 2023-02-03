import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from '../interfaces/user';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
@Input() userss!: any;
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

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.users);
    this.users.push(this.userss)
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