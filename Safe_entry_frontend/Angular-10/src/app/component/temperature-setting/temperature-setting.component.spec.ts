import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureSettingComponent } from './temperature-setting.component';

describe('TemperatureSettingComponent', () => {
  let component: TemperatureSettingComponent;
  let fixture: ComponentFixture<TemperatureSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
