import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersCreateComponent } from './publishers-create.component';

describe('PublishersCreateComponent', () => {
  let component: PublishersCreateComponent;
  let fixture: ComponentFixture<PublishersCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishersCreateComponent]
    });
    fixture = TestBed.createComponent(PublishersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
