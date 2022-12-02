import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// own files
import { MonitorInterval } from '../../../shared/models/monitor-interval.enum';
import { MonitorURL } from '../../../shared/models/monitor-url.model';

@Component({
  selector: 'app-add-monitor-url',
  templateUrl: './add-monitor-url.component.html',
  styleUrls: ['./add-monitor-url.component.sass'],
})
export class AddMonitorUrlComponent implements OnInit {
  private readonly URL_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  form: UntypedFormGroup = new UntypedFormGroup({});
  intervalOptions = MonitorInterval;
  editMode: boolean = false;

  @Input()
  editMonitorURL: MonitorURL | null = null;
  @Output()
  formSubmit = new EventEmitter<MonitorURL>();
  @Output()
  clickCancelEvent = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.editMonitorURL) {
      this.editMode = true;
    }
    this.form = this.fb.group({
      url: [
        this.editMonitorURL ? this.editMonitorURL.url : '',
        [Validators.required, Validators.pattern(this.URL_REGEX)],
      ],
      interval: [this.editMonitorURL?.interval ? this.editMonitorURL?.interval : this.intervalOptions.DREIZIG],
    });
  }

  onFormSubmit(): void {
    const url = { ...this.form?.value };
    if (this.editMonitorURL?.id) {
      url.id = this.editMonitorURL.id;
    }
    this.formSubmit.emit(url);
  }

  onClickCancel(): void {
    this.clickCancelEvent.emit(true);
  }

  get intervalOptionsKeys(): Array<String> {
    return Object.keys(MonitorInterval);
  }
}
