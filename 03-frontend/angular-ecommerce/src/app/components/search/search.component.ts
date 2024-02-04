import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/services/logs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  env = environment;

  constructor(private router: Router,
              private logsService: LogsService) { }

  ngOnInit(): void {
  }

  doSearch(value: string){
    this.logsService.logMessage("Serching");
    this.router.navigateByUrl(`search/${value}`);
  }

}
