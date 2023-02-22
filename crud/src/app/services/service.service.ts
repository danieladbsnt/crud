import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
private countryApi: string = 'https://restcountries.com/v3.1/all?fields=name';

  constructor(private http: HttpClient) { }

   getData() {
    return this.http.get<User[]>('http://localhost:3000/users')
   }

   postData(data: User[]) {
    return this.http.post<User[]>('http://localhost:3000/users', data)
   }

   updateData(data: User, id: number) {
    return this.http.patch<User[]>(`http://localhost:3000/users/${id}`, data)
   }

   deleteData(id: number){
    return this.http.delete<User[]>(`http://localhost:3000/users/${id}`)
   }

//obtener países
   getCountries() {
    return this.http.get(this.countryApi)
   }
}
