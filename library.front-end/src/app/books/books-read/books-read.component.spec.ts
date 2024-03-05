import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReadComponent } from './books-read.component';

describe('BooksReadComponent', () => {
  let component: BooksReadComponent;
  let fixture: ComponentFixture<BooksReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksReadComponent]
    });
    fixture = TestBed.createComponent(BooksReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
