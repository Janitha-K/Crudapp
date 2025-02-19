import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

addEmployee(data: any){
return this._http.post('http://localhost:3000/employee',data)
}
updateEmployee(id: number,data: any): Observable<any> {
  return this._http.put<any[]>(`http://localhost:3000/employee/${id}`,data);
}

getEmployeeList(){
  return this._http.get<any[]>('http://localhost:3000/employee')
}

deleteEmployee(id: number): Observable<any> {
  return this._http.delete<any[]>(`http://localhost:3000/employee/${id}`);
}
}
