import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShibeCardComponent } from './shibe-card.component';

describe('ShibeCardComponent', () => {
  let component: ShibeCardComponent;
  let fixture: ComponentFixture<ShibeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShibeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShibeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
