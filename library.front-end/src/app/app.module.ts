import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsModule } from './authors/authors.module';
import { HomeComponent } from './home/home.component';
import { PublishersModule } from './publishers/publishers.module';
import { BooksModule } from './books/books.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guards/auth-guard';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthorsModule,
    HttpClientModule,
    RouterModule,
    PublishersModule,
    BooksModule,
    LoginModule,
    SharedModule,
    NgbModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
