import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Intent} from '../util/intent';
import {SignInComponent} from '../components/signin.component';
import {LoginAction} from '../enums/login.action';


export class LoginIntent implements Intent<SignInComponent, LoginAction> {

    public bind(view: SignInComponent): Observable<LoginAction> {
        return Observable.merge(
            view.signinButton$.map(() => LoginAction.Signup),
            view.signoutButton$.map(() => LoginAction.Signout)
        );
    }
}
