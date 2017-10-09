import * as React from 'react';
import {StackNavigator} from 'react-navigation';
import LoginScreen from './login';
import HomeScreen from './screens/home';
import OtherScreen from './screens/other-screen';


const AppNavigator = StackNavigator({
    // Screens
    Home: { screen: HomeScreen},
    Other: { screen: OtherScreen}
});

export default class App extends React.Component<{}> {
  render() {
    return (
        <AppNavigator />
    );
  }
}
