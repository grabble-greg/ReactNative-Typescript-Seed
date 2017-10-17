import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Intent} from '../util/intent';
import {SignUpComponent} from '../components/signup.component';
import {LoginAction} from '../enums/login.action';


export class LoginIntent implements Intent<SignUpComponent, LoginAction> {

    public observe(view: SignUpComponent): Observable<LoginAction> {
        return Observable.merge(
            view.signinButton$.map(() => LoginAction.Signup),
            view.signoutButton$.map(() => LoginAction.Signout)
        );
    }
}
