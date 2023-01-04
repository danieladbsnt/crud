import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

//@Output() data = new EventEmitter<any>();

 users: User[] = [];

  constructor(private service: ServiceService) { 
  }

  ngOnInit(): void {
    this.service.getData()
      .subscribe(users => {
        this.users = users;
        console.log(users);
      });
  }
//cuando le de click al lapiz para editar, se tiene que poner la info
//del user que se toca en el form.
update(data:any, id: number) {
  console.log('editando');
  
  this.service.updateData(data, id)
  .subscribe(resp => {
    console.log(resp);
  
  })
}

delete(id: number) {
  //borra pero no se pinta en la tabla al menos que refresques.
  this.service.deleteData(id)
    .subscribe(resp => {}) 
}

}
