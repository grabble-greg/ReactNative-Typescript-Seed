import * as React from 'react';
import {StackNavigator} from 'react-navigation';
import {HomeScreen} from './screens/home';

// General setup to have navigation between components
// Hopefully in the future we can pass in full MVI components
const AppNavigator = StackNavigator({
    // Screens
    Home: { screen: HomeScreen}
});

export default class App extends React.Component<{}> {
  render() {
    return (
        <AppNavigator />
    );
  }
}
