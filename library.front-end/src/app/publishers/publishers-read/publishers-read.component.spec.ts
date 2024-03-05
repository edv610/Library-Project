import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersReadComponent } from './publishers-read.component';

describe('PublishersReadComponent', () => {
  let component: PublishersReadComponent;
  let fixture: ComponentFixture<PublishersReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishersReadComponent]
    });
    fixture = TestBed.createComponent(PublishersReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
