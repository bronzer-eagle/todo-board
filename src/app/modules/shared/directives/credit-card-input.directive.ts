import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
	selector: '[appCreditCardInput]'
})
export class CreditCardInputDirective {
	constructor(private el: ElementRef) {
		console.log('test constructor');
	}

	@HostListener('input', ['$event']) onInput($event) {
		console.log($event);
	}

}
