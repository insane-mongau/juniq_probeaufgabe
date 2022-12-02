import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorUrlPageComponent } from './monitor-url-page.component';

describe('MonitorUrlPageComponent', () => {
  let component: MonitorUrlPageComponent;
  let fixture: ComponentFixture<MonitorUrlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorUrlPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorUrlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
