import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  constructor(private http: HttpClient) {}

  getBrazilianStates(): Observable<any> {
    return this.http.get('assets/data/brazilianStates.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
