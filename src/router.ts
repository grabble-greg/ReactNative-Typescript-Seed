import {StackNavigator} from 'react-navigation';
import {SignUp} from './component/signup.component';
import {SignIn} from './component/signin.component';

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
