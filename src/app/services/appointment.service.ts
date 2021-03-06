import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiFacade } from '../core/api.facade';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private readonly apiService: ApiFacade) { }

  public createAppointment(obj: any): Observable<any> {
    return this.apiService.post('/api/appointment', obj);
  }

  public listAppointment(): Observable<any> {
    const url = '/api/listAppointments';
    return this.apiService.get<any>(url).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status == 404) {
                return null;
            }
            return throwError(error);
        })
    );
  }
}
