import * as React from 'react';
import {StackNavigator} from 'react-navigation';
import Login from './login';


const PresentsApp = StackNavigator({
    Login: { screen: Login }
});

export default class App extends React.Component<{}> {
  render() {
    return (
        <PresentsApp />
    );
  }
}
