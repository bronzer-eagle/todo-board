import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreditCardInputDirective} from './directives/credit-card-input.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [CreditCardInputDirective],
	exports: [CreditCardInputDirective]
})
export class SharedModule {
}
