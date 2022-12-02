import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';

import { AddMonitorUrlComponent } from './add-monitor-url.component';

describe('AddMonitorUrlComponent', () => {
  let component: AddMonitorUrlComponent;
  let fixture: ComponentFixture<AddMonitorUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMonitorUrlComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatDividerModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMonitorUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test invalid form inputs', () => {
    // invalid url
    const urlInputCtrl = component.form.get('url');
    const urlInput = fixture.debugElement.query(By.css('input[type="text"]'));
    urlInputCtrl?.setValue('test');
    fixture.detectChanges();
    expect(urlInput.nativeElement.value).toBe('test');
    expect(component.form.invalid).toBeTruthy();
  });
});
