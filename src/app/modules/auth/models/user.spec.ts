import {User} from './user';

let userData = {
	firstName: 'Alex',
	lastName: 'Bond',
	email: 'alex-091@yandex.ru',
	phone: '0800400500',
	birthday: {
		year: 1996,
		month: 0,
		day: 9
	}
};

describe('User', () => {
	it('should create an instance', () => {
		expect(new User({})).toBeTruthy();
	});
	it('should accept all fields', () => {
		const user = new User(userData);

		expect(user.firstName).toEqual(userData.firstName);
	});
	it('should return right full name', () => {
		const user = new User(userData);
		const fullName = userData.firstName + ' ' + userData.lastName;

		expect(user.fullName).toEqual(fullName);
	});
	it('should return right age', () => {
		const user = new User(userData);
		const yearNow = 2017;
		const age = yearNow - userData.birthday.year;

		expect(user.age).toEqual(age);
	});
});
