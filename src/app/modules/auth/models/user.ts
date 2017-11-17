export class User {
	public firstName: string;
	public lastName: string;
	public email: string;
	public phoneNumber: string;

	private _birthdate: Date;

	get fullName(): string {
		return this.firstName + ' ' + this.lastName;
	}

	get age(): number {
		const thisYear = +new Date().getFullYear();
		const bdYear = +this._birthdate.getFullYear();

		return thisYear - bdYear;
	}

	set birthday({day, month, year}) {
		this._birthdate = new Date(year, month, day);
	}

	constructor(data) {
		Object.assign(this, data);
	}
}
