import {StackNavigator} from 'react-navigation';
import {SignUp} from './components/signup.component';
import {SignIn} from './components/signin.component';

export const SignedOut = StackNavigator({
    SignUp: {
        screen: SignUp,
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
