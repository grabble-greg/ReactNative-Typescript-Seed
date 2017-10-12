import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {CounterModel} from '../models/counter.model';
import {Text, View} from 'react-native';
import {Subject} from 'rxjs/Subject';
import {ComponentProps, CycleComponent} from '../util/component';
import {Card, Button} from 'react-native-elements';
import {NavigationScreenProps} from 'react-navigation';

interface SignUpProps extends NavigationScreenProps<{}>, ComponentProps<{}> {}

export class SignUp extends CycleComponent<{}, {}, SignUpProps> {

    redraw(state: {}): false | JSX.Element | null {
        const navigation = this.props.navigation;
        return (
            <View style={{paddingVertical: 20}}>
                <Card>
                    {/* ... */}

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="transparent"
                        textStyle={{ color: "#bcbec1" }}
                        title="Sign In"
                        onPress={() => navigation.navigate("SignIn")}
                    />
                </Card>
            </View>
        );
    }
}
