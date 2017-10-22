import {Observable} from 'rxjs/Observable';
import {Model, Reducer} from '../util/model';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {LoginState} from '../states/login.state';
import {LoginAction} from '../enums/login.action';
import {GoogleSignin, User} from 'react-native-google-signin';

export class UserModel implements Model<LoginState, LoginAction> {

    public bind(intent: Observable<LoginAction>): Observable<Reducer<LoginState>> {
        const initialsReducer$ = Observable.fromPromise(GoogleSignin.hasPlayServices({autoResolve: true}))
            .map((hasPlayServices: boolean) => hasPlayServices
                ? GoogleSignin.configure({
                    iosClientId: '722901518519-t2jdrpm0u1f87kohf36ppd2f3rrilu7v.apps.googleusercontent.com',
                    webClientId: '722901518519-t2jdrpm0u1f87kohf36ppd2f3rrilu7v.apps.googleusercontent.com',
                    offlineAccess: false
                })
                : Observable.throw('No google play services')
            )
            .mergeMap(() => GoogleSignin.currentUserAsync())
            .map((user: User) => () => {
                return ({
                        user: user,
                        canLogin: true,
                        loggedIn: user && user.email ? true : false
                    } as LoginState
                )
            })
            .catch(() => Observable.of((err: any) => ({
                canLogin: false,
                loggedIn: false,
                error: err
            } as LoginState)));

        const loginReducer$: Observable<Reducer<LoginState>> = intent.map(
            (intent: LoginAction) => {
                switch (intent) {
                    case LoginAction.Signup:
                        return Observable.fromPromise(GoogleSignin.signIn())
                            .map((user: User) => {
                                return (prevState: LoginState) => {
                                    return {
                                        ...prevState,
                                        user: user
                                    } as LoginState
                                };
                            });
                    case LoginAction.Signout:
                        return Observable.fromPromise(GoogleSignin.revokeAccess())
                            .mergeMap(() => GoogleSignin.signOut())
                            .map(() => {
                                return (prevState: LoginState) => {
                                    return {
                                        canLogin: true,
                                        loggedIn: false
                                    } as LoginState
                                };
                            });
                    default:
                        throw new Error(`Unhandled counter intent: ${intent}`);
                }
            })
            .mergeMap(x => x)
            .catch(() => Observable.of((err: any) => ({
                canLogin: true,
                loggedIn: false,
                loginError: err
            } as LoginState)));


        return Observable.merge(initialsReducer$, loginReducer$);
    }
}
