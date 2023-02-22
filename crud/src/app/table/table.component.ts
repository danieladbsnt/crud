import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
@Output() userEdited: EventEmitter<User> = new EventEmitter();

@Input() users!: User[];

private _unsuscribe$ = new Subject<boolean>();

  constructor(private service: ServiceService) { }

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

ngOnDestroy(): void {
  this._unsuscribe$.next(true)
  this._unsuscribe$.complete();
}
}