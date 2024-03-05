import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksRelationsComponent } from './books-relations.component';

describe('BooksRelationsComponent', () => {
  let component: BooksRelationsComponent;
  let fixture: ComponentFixture<BooksRelationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksRelationsComponent]
    });
    fixture = TestBed.createComponent(BooksRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
