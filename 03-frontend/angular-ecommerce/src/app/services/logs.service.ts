import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralHttpService } from './common/general-http.service';
import { LogsRequest } from '../common/logs-request';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private baseUrl: string = environment.backendApiUrl + "/logs";

  constructor(private httpClient : HttpClient,
              private commonHttpservice: GeneralHttpService) { }


  logMessage(logMessage: string){
    let logsRequest = this.getLogsRequest(logMessage);
    this.httpClient.post<LogsRequest>(this.baseUrl, logsRequest, this.commonHttpservice.getHttpOptions()).subscribe();
  }


  getLogsRequest(logMessage: string) : LogsRequest{
    let logsRequest = new LogsRequest();
    logsRequest.message = "[FRONTEND] " + logMessage;
    return logsRequest;
  }
}
