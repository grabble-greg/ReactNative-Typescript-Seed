import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';

interface OtherScreenNavigationParams {}
interface OtherScreenProps extends NavigationScreenProps<OtherScreenNavigationParams> {}

export default class OtherScreen extends React.Component<OtherScreenProps> {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome
                </Text>
                <Button onPress={() => navigate('Other')} title="Go to Other" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
