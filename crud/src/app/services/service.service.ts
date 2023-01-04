import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
 
// data: BehaviorSubject<any> = new BehaviorSubject<any>(null)

//   setData(data:any) {
//     this.data.next(data)
//   }

   getData() {
    return this.http.get<User[]>('http://localhost:3000/users')
   }

   postData(data: any) {
    return this.http.post<User[]>('http://localhost:3000/users', data)
   }

   updateData(data: any, id: number) {
    return this.http.put<User[]>(`http://localhost:3000/users/${id}`, data)
   }

   deleteData(id: number){
    return this.http.delete<User>(`http://localhost:3000/users/${id}`)
   }
}
