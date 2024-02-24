import { Injectable } from '@angular/core';
import { LogsService } from './logs.service';

@Injectable({
  providedIn: 'root'
})
export class BugsCheckerService {

  constructor(private logsService: LogsService) { }

  checkBugMinLength(value: string, bugMessage: string){
    if(value.length >= 2){
      this.logsService.logMessage(bugMessage)
    }
  }

  checkOnlyNumbersPattern(isValid: boolean | undefined, value: string, bugMessage: string, length: number){
    if(isValid){
      if (value && /^[0-9]*$/.test(value) && value.length === length) {
        this.logsService.logMessage(bugMessage)
      }
    }
    else{
      if (value && /^[0-9]*$/.test(value) && value.length !== length) {
        this.logsService.logMessage(bugMessage)
      }
    }
  }

  checkRequired(value: string, bugMessage: string){
    if(!value || value.length === 0){
       this.logsService.logMessage(bugMessage);
    }
  }

}
