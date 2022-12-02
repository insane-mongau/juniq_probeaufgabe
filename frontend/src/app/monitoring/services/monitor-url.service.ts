import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as uuid from 'uuid';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
// Own Files
import { MonitorURL } from 'src/app/shared/models/monitor-url.model';

@Injectable({ providedIn: 'root' })
export class MonitorURLService {
  private readonly BASE_URL = 'http://localhost:8080/';
  private readonly API_URL = this.BASE_URL + 'monitoring-url';
  private store: { monitorUrls: Array<MonitorURL> } = { monitorUrls: [] };
  private _monitorURLData$ = new BehaviorSubject<Array<MonitorURL>>([]);
  readonly monitorURLData$ = this._monitorURLData$.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAll(): void {
    this._monitorURLData$.next(Object.assign({}, this.store).monitorUrls);
  }

  getById(id: string): MonitorURL {
    return this.store.monitorUrls.filter((url) => url.id === id)[0];
  }

  create(newURL: MonitorURL): MonitorURL {
    const id = uuid.v4();
    newURL.id = id;
    this.store.monitorUrls.push(newURL);
    this._monitorURLData$.next(Object.assign({}, this.store).monitorUrls);
    return newURL;
  }

  checkURL(url: MonitorURL): void {
    const headers: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    const params = new HttpParams().set('monitorUrl', url.url);
    console.log(url.url);
    this.http
      .get<number>(this.API_URL + '/check', { headers: headers, params: params })
      .pipe(first())
      .subscribe({
        next: (status) => {
          if (status > -1) {
            const updatedUrl: MonitorURL = {
              ...url,
              statusCode: status,
              lastUpdate: Date.now(),
            };
            const index = this.store.monitorUrls.findIndex((url) => url.id === updatedUrl.id);
            this.store.monitorUrls[index] = updatedUrl;
            this._monitorURLData$.next(Object.assign({}, this.store).monitorUrls);
          } else {
            this.handleError('Leider ist ein Fehler beim Überprüfen der URL passiert.');
          }
        },
        error: () => {
          this.handleError('Leider ist ein Fehler beim Überprüfen der URL passiert.');
        },
      });
  }

  delete(id: string): void {
    const filteredURLs = this.store.monitorUrls.filter((url) => url.id !== id);
    this.store.monitorUrls = filteredURLs;
    this._monitorURLData$.next(Object.assign({}, this.store).monitorUrls);
  }

  update(updateURL: MonitorURL): MonitorURL {
    const index = this.store.monitorUrls.findIndex((url) => url.id === updateURL.id);
    this.store.monitorUrls[index] = {...this.store.monitorUrls[index], ...updateURL};
    this._monitorURLData$.next(Object.assign({}, this.store).monitorUrls);
    return this.store.monitorUrls[index];
  }

  private handleError(message: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }
}
