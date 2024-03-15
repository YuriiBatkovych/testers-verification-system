import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-bug-declare',
  templateUrl: './bug-declare.component.html',
  styleUrls: ['./bug-declare.component.css']
})
export class BugDeclareComponent implements OnInit {

  constructor(private logsService: LogsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  replaceDoubleSlashes(inputString: string): string {
    // Use regular expression to replace double slashes with single slash
    return inputString.replace(/\/\//g, '/');
  } 

  removeNumbersFromString(inputString: string): string {
    // Use regular expression to replace numbers with an empty string
    return inputString.replace(/\d+/g, '');
  }

  cleanRoute(routeStr: string){
    return this.replaceDoubleSlashes(this.removeNumbersFromString(routeStr));
  }

  declareBug(){
    const currentRoute = this.router.url;
    this.logsService.logMessage("Bug declaration " + currentRoute);

    let routeWithoutIds = this.cleanRoute(currentRoute);
    this.logsService.logMessage("Bug declaration " + routeWithoutIds);
  }

}
