import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CommonService {
	routeData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor() {
	}

	apiPrefixed(url) {
		return 'http://localhost:5000/api/' + url;
	}

}
