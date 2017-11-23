import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreditCardInputDirective} from './directives/credit-card-input.directive';
import {GuardService} from './services/guard.service';
import { SpinBtnComponent } from './components/spin-btn/spin-btn.component';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [GuardService],
	declarations: [CreditCardInputDirective, SpinBtnComponent],
	exports: [CreditCardInputDirective, SpinBtnComponent]
})
export class SharedModule {
}
