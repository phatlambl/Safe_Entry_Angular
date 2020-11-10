import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartByUserComponent } from './chart-by-user.component';

describe('ChartByUserComponent', () => {
  let component: ChartByUserComponent;
  let fixture: ComponentFixture<ChartByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
