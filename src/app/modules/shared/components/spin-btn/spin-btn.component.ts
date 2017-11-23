import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-spin-btn',
	templateUrl: './spin-btn.component.html',
	styleUrls: ['./spin-btn.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SpinBtnComponent implements OnInit {
	@Input() isDisabled: boolean;
	@Input() type: string;
	@Input() classes: string;
	@Input() spin: boolean;
	@Output() byClick = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	confirm() {
		this.byClick.emit();
	}

}
