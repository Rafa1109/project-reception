import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-loading',
    template: `
    <div *ngIf="visible" class="loading">
        <p-progressSpinner [style]="{'width': '64px','height': '64px'}" strokeWidth="8"></p-progressSpinner>
    </div>`,
    styles: [`
    .loading {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class LoadingComponent {
    @Input() visible = false;
}