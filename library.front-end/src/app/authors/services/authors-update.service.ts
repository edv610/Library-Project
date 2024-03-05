import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorsUpdateService {
  constructor(private http: HttpClient) {}

  updateAuthor(dataName: any, dataId: any) {
    return this.http.put<any>(
      `http://localhost:8080/authors/update/${dataId}`,
      dataName
    );
  }
}
