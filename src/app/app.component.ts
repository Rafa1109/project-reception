import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'project-reception';
  
  constructor(private config: PrimeNGConfig, 
    private httpClient: HttpClient, 
    private primengConfig: PrimeNGConfig) {

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
