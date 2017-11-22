import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
	birthdayParams: object;
	signUpForm: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private authService: AuthService,
				private router: Router) {
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

		this._createForm();
	}

	public onSubmit(): void {
		const createdUser = new User(this.signUpForm.value);

		this.authService.signUp(createdUser)
			.subscribe(res => {
				console.log(res);
				console.log('User created: ', createdUser);
				this.router.navigateByUrl('auth/login');
			}, err => {
				console.log(err);
			});
	}

	private _createForm() {
		this.signUpForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			password: ['', Validators.required],
			passwordRepeat: ['', Validators.required],
			birthday: this.formBuilder.group({
				year: ['', Validators.required],
				month: ['', Validators.required],
				day: ['', Validators.required]
			})
		});

		// this.signUpForm.valueChanges.subscribe(
		// 	(value: string) => {
		//
		// 	});
	}
}
