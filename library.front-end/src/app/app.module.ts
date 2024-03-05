import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsModule } from './authors/authors.module';
import { HomeComponent } from './home/home.component';
import { PublishersModule } from './publishers/publishers.module';
import { BooksModule } from './books/books.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}