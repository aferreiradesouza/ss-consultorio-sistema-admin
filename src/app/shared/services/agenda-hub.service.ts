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
      .withUrl(environment.urlSignalR + 'agendaHub',{
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
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...', err);  
      });   
  }
  
  private registerOnServerEvents(): void {  
    this._hubConnection.onclose((data: any) => {  
      console.log('onclose', data);  
      this.startConnection();
    });  
    this._hubConnection.on('NovaConsulta', (nomeUsuario: any, data: any) => {  
      console.log('NovaConsulta', nomeUsuario, JSON.parse(data));  
      this.novaConsulta.emit(JSON.parse(data));  
    });  
    this._hubConnection.on('NovoBloqueio', (nomeUsuario: any, data: any) => {  
        console.log('NovoBloqueio', nomeUsuario, JSON.parse(data));  
        this.novoBloqueio.emit(JSON.parse(data));  
      });  
      this._hubConnection.on('MudancaBloqueio', (nomeUsuario: any, data: any) => {  
        console.log('MudancaBloqueio', nomeUsuario, JSON.parse(data));  
        this.mudancaBloqueio.emit(JSON.parse(data));  
      });  
      this._hubConnection.on('MudancaStatusConsulta', (nomeUsuario: any, data: any) => {  
        console.log('MudancaStatusConsulta', nomeUsuario, JSON.parse(data));  
        this.mudancaStatusConsulta.emit(JSON.parse(data));  
      });  
  }  
}
