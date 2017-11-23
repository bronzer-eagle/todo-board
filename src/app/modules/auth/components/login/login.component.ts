import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	public signInForm: FormGroup;
	public processing = false;

	constructor(private routeService: ActivatedRoute,
				private router: Router,
				private formBuilder: FormBuilder,
				private authService: AuthService) {
	}

	ngOnInit() {
		this._checkRoute();
		this._createForm();
	}

	public submitForm() {
		const user = this.signInForm.value;

		this.processing = true;

		this.authService.signIn(user)
			.finally(() => this.processing = false)
			.subscribe(res => {
				console.log(res);
				this.authService.setLogged();
				this.router.navigateByUrl('app/boards-list');
			}, err => console.log(err));
	}

	public isDisabledSubmit(): boolean {
		return this.signInForm.invalid || this.signInForm.pending;
	}

	/**
	 * Fixing Angular bug, connected with redirects
	 * @private
	 */

	private _checkRoute() {
		this.routeService.url.subscribe(urlArr => {
			const url = urlArr[0];

			if (url.path.indexOf('auth') === -1) {
				this.router.navigateByUrl('auth/login');
			}
		});
	}

	private _createForm() {
		this.signInForm = this.formBuilder.group({
			'email': ['', Validators.required],
			'password': ['', Validators.required]
		});
	}
}
