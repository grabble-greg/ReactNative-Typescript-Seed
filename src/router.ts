import {StackNavigator} from 'react-navigation';
import {SignUpComponent} from './components/signup.component';
import {SignIn} from './components/signin.component';

export const SignedOut = StackNavigator({
    SignUp: {
        screen: SignUpComponent,
        navigationOptions: {
            title: "Sign Up"
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In"
        }
    }
});
