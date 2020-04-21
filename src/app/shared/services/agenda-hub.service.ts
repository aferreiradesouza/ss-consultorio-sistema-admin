import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaHubService {
  novaConsulta = new EventEmitter<any>();
  novoBloqueio = new EventEmitter<any>();
  mudancaBloqueio = new EventEmitter<any>();
  mudancaStatusConsulta = new EventEmitter<any>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.urlSignalR + 'agendaHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build();
  }

  private startConnection(): void {
    Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.onclose((data: any) => {
      this.startConnection();
    });
    this._hubConnection.on('NovaConsulta', (usuario: any, data: any) => {
      const response = JSON.parse(data);
      response.cpfCriador = JSON.parse(usuario);
      this.novaConsulta.emit(response);
    });
    this._hubConnection.on('NovoBloqueio', (usuario: any, data: any) => {
      const response = JSON.parse(data);
      response.cpfCriador = JSON.parse(usuario);
      this.novoBloqueio.emit(response);
    });
    this._hubConnection.on('MudancaBloqueio', (usuario: any, data: any) => {
      const response = JSON.parse(data);
      response.cpfCriador = JSON.parse(usuario);
      this.mudancaBloqueio.emit(response);
    });
    this._hubConnection.on('MudancaStatusConsulta', (usuario: any, data: any) => {
      const response = JSON.parse(data);
      response.cpfCriador = JSON.parse(usuario);
      this.mudancaStatusConsulta.emit(response);
    });
  }
}
