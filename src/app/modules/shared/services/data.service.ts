import {Injectable} from '@angular/core';

@Injectable()
export class DataService {

	constructor() {
	}

	static setBirthdayParams(): Object {
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

}
