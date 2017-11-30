import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {DataService} from '../../../shared/services/data.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
	birthdayParams: object;
	signUpForm: FormGroup;
	processing = false;

	constructor(private formBuilder: FormBuilder,
				private authService: AuthService,
				private router: Router,
				private dataService: DataService) {
	}

	ngOnInit() {
		this.birthdayParams = DataService.setBirthdayParams();

		this._createForm();
	}

	public submitForm(): void {
		const createdUser = new User(this.signUpForm.value);

		this.processing = true;

		this.authService.signUp(createdUser)
			.finally(() => this.processing = false)
			.subscribe(
				res => {
					console.log(res);
					console.log('User created: ', createdUser);
					this.router.navigateByUrl('auth/login');
				},
				err => console.log(err)
			);
	}

	public isDisabledSubmit(): boolean {
		return this.signUpForm.invalid || this.signUpForm.pending;
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
	}
}
