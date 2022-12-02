import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// Own Files
import { MonitorURL } from '../../../shared/models/monitor-url.model';
import { MonitorInterval } from '../../../shared/models/monitor-interval.enum';

@Component({
  selector: 'app-monitor-url-table',
  templateUrl: './monitor-url-table.component.html',
  styleUrls: ['./monitor-url-table.component.sass'],
})
export class MonitorUrlTableComponent {
  displayedColumns: string[] = ['url', 'interval', 'statusCode', 'lastUpdate', 'delete'];
  dataSource: MatTableDataSource<MonitorURL>;
  tableData: Array<MonitorURL> = [];
  intervalOptions = MonitorInterval;

  @Input()
  monitorURLs: Array<MonitorURL> = [];
  @Output()
  deleteRow = new EventEmitter<string>();
  @Output()
  editRow = new EventEmitter<string>();

  constructor() {
    this.dataSource = new MatTableDataSource(this.monitorURLs);
  }

  editTableRow(id: string): void {
    this.editRow.emit(id);
  }

  deleteTableRow(id: string): void {
    this.deleteRow.emit(id);
  }
}
