import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersUpdateComponent } from './publishers-update.component';

describe('PublishersUpdateComponent', () => {
  let component: PublishersUpdateComponent;
  let fixture: ComponentFixture<PublishersUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishersUpdateComponent]
    });
    fixture = TestBed.createComponent(PublishersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
