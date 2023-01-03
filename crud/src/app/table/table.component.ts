import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

@Output() data = new EventEmitter<any>();


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

update() {
  console.log('editando');
  // let body = {
    
  // }
  // this.service.updateData(data, id)
  // .subscribe(resp => {
  //   console.log(resp);
    
  // })
}

delete() {
  console.log( 'borrando');
  // this.service.deleteData(this.users.id) POR QUE NO VAAA
}

}
