import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDetailsComponent } from './books-details.component';

describe('BooksDetailsComponent', () => {
  let component: BooksDetailsComponent;
  let fixture: ComponentFixture<BooksDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksDetailsComponent]
    });
    fixture = TestBed.createComponent(BooksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
