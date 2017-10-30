import {StackNavigator} from 'react-navigation';
import {CounterComponent} from './components/counter.component';
// import {LoginComponent} from './components/login.component';

export const SignedOut = StackNavigator({
    Counter: {
        screen: CounterComponent,
    },
    // SignIn: {
    //     screen: LoginComponent,
    //     navigationOptions: {
    //         title: 'Sign In'
    //     }
    // }
});
