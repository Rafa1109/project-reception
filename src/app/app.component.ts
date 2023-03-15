import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  template: `
    <app-loading [visible]="loaderService.isLoadingFromView"></app-loading>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'project-reception';
  
  constructor(private config: PrimeNGConfig, 
    private httpClient: HttpClient, 
    private primengConfig: PrimeNGConfig,
    public loaderService: LoaderService) {

    }

  ngOnInit(): void {
    this.translate();
    this.primengConfig.ripple = true;
  }

  translate(){
    this.httpClient.get("assets/i18n/pt.json")
    .subscribe({
      next: (result: any) => {
        this.config.setTranslation(result.primeng);
      },
      error: (e) => console.log(e)
    });
  }
  
  ngOnDestroy() { }
}
