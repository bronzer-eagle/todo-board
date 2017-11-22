import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreditCardInputDirective} from './directives/credit-card-input.directive';
import {GuardService} from './services/guard.service';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [GuardService],
	declarations: [CreditCardInputDirective],
	exports: [CreditCardInputDirective]
})
export class SharedModule {
}
