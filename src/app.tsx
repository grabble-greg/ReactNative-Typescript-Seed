import * as React from 'react';
import {StackNavigator} from 'react-navigation';
import {Counter} from './component/counter';

// General setup to have navigation between components
const AppNavigator = StackNavigator({
    // Screens
    Counter: {
        screen: Counter
    }
});

export default class App extends React.Component<{}> {
    render() {
        return (
            <AppNavigator/>
        );
    }
}
