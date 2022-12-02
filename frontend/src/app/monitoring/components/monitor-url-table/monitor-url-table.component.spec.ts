import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorUrlTableComponent } from './monitor-url-table.component';

describe('MonitorUrlTableComponent', () => {
  let component: MonitorUrlTableComponent;
  let fixture: ComponentFixture<MonitorUrlTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorUrlTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorUrlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
