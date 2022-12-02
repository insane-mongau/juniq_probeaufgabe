import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
// own Files
import { MonitorURL } from '../../../shared/models/monitor-url.model';
import { MonitorURLService } from '../../services/monitor-url.service';

@Component({
  selector: 'app-monitor-url-page',
  templateUrl: './monitor-url-page.component.html',
  styleUrls: ['./monitor-url-page.component.sass'],
})
export class MonitorUrlPageComponent implements OnInit, OnDestroy {
  showAddForm: boolean = false;
  monitorURLs$: Observable<Array<MonitorURL>>;
  monitorURLs: Array<MonitorURL> = [];
  urlSubscriptions: any = {};
  selectedMonitorURL: MonitorURL | null = null;

  constructor(private monitorUrlSrv: MonitorURLService) {
    this.monitorURLs$ = monitorUrlSrv.monitorURLData$;
  }

  ngOnInit(): void {
    this.monitorURLs$.subscribe({
      next: urls => (this.monitorURLs = [...urls]),
    });
    this.monitorUrlSrv.getAll();

    if (this.monitorURLs.length === 0) {
      this.showAddForm = true;
    }
  }

  saveMonitorURL(saveURL: MonitorURL): void {
    // add protocol
    if (!saveURL.url.includes('http')) {
      saveURL.url = 'https://' + saveURL.url;
    }
    // update or add
    if (saveURL.id) {
      this.updateMonitorURL(saveURL);
      this.selectedMonitorURL = null;
    } else {
      this.addMonitorURL(saveURL);
    }
    this.showAddForm = false;
  }

  addMonitorURL(newURL: MonitorURL): void {
    const createdUrl: MonitorURL = this.monitorUrlSrv.create(newURL);
    if (createdUrl.id) {
      // initial check
      this.monitorUrlSrv.checkURL(createdUrl);
      // set up interval subscription for check
      this.urlSubscriptions[createdUrl.id] = interval(createdUrl.interval).subscribe(() => {
        this.monitorUrlSrv.checkURL(createdUrl);
      });
    }
  }

  updateMonitorURL(updateURL: MonitorURL): void {
    const updatedURL = this.monitorUrlSrv.update(updateURL);
    if (updatedURL.id) {
      // unsub old subscription
      this.urlSubscriptions[updatedURL.id].unsubscribe();
      // initial check
      this.monitorUrlSrv.checkURL(updatedURL);
      // set up interval subscription for check
      this.urlSubscriptions[updatedURL.id] = interval(updatedURL.interval).subscribe(() => {
        this.monitorUrlSrv.checkURL(updatedURL);
      });
    }
  }

  editMonitorURL(id: string): void {
    this.selectedMonitorURL = this.monitorUrlSrv.getById(id);
    this.showAddForm = true;
  }

  deleteMonitorURL(id: string): void {
    this.monitorUrlSrv.delete(id);
    this.urlSubscriptions[id].unsubscribe();
  }

  ngOnDestroy(): void {
    Object.keys(this.urlSubscriptions).forEach(key => {
      this.urlSubscriptions[key].unsubscribe();
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}
