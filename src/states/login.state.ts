import {User} from 'react-native-google-signin';

export interface LoginState {
    user?: User;
    canLogin: boolean;
    loggedIn: boolean;
    loginError?: any;
}
