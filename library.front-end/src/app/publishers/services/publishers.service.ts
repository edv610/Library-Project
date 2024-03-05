import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PublishersService {
  constructor(private http: HttpClient) {}

  createPublisher(publisher: any) {
    return this.http.post<any>(
      'http://localhost:8080/publisher/create',
      publisher
    );
  }

  getPublishers() {
    return this.http.get<any[]>('http://localhost:8080/publisher/all');
  }
  getPublisherDetails(publisherId: number) {
    return this.http.get<any>(
      `http://localhost:8080/publisher/details/${publisherId}`
    );
  }
  deletePublisher(publisherId: number) {
    return this.http.delete<any>(
      `http://localhost:8080/publisher/delete/${publisherId}`
    );
  }

  updatePublisher(dataId: any, publisher: any) {
    return this.http.put<any>(
      `http://localhost:8080/publisher/update/${dataId}`,
      publisher
    );
  }
}
