import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../models/user';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
	newUser = {birthday: {}};
	birthdayParams: object;

	constructor() {
	}

	static _setBirthdayParams(): Object {
		return {
			get years() {
				return this._iterator(1917, 2017);
			},

			get months() {
				return this._iterator(0, 11);
			},

			get days() {
				return this._iterator(1, 31);
			},

			_iterator: (from, to) => {
				const arr = [];

				for (let i = from; i <= to; i++) {
					arr.push(i);
				}

				return arr;
			}
		};
	}

	ngOnInit() {
		this.birthdayParams = SignupComponent._setBirthdayParams();

		console.log(this.birthdayParams);
	}

	public onSubmit(): void {
		const createdUser = new User(this.newUser);

		console.log('User created: ', createdUser);
	}
}
