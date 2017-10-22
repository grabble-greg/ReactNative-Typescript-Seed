import {StackNavigator} from 'react-navigation';
import {CounterComponent} from './components/counter.component';
// import {SignInComponent} from './components/signin.component';

export const SignedOut = StackNavigator({
    SignIn: {
        screen: CounterComponent,
        navigationOptions: {
            title: "Sign In"
        }
    }
});
