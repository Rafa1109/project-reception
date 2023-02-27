import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'base-content',
    templateUrl: './base-content.component.html'
})
export class BaseContentComponent implements OnInit {

    @Input() styleClass: string = '';

    ngOnInit(): void {
        console.log('style', this.styleClass);
    }

}